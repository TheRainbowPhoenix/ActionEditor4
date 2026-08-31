// scenes/StageScene.js
import { DataManager } from '../managers/DataManager.js';
import {
    ActorEntity,
    ActorEntityList,
    AQUEDI_PHYSICS,
    PlayerEntity,
    commandSpeedToSubstepSpeed
} from '../objects/AquediPhysics.js';
import {
    AQUEDI_FLOW_TIMING,
    CharacterInheritanceResolver,
    normalizeActorCommandDetails
} from '../objects/AquediCharacterModel.js';
import { createAquediMessageWindow, measureAquediText } from '../ui/AquediGui.js';
import { Window_AquediStageHud } from '../ui/AquediHud.js';

const TILE     = AQUEDI_PHYSICS.TILE;
const SCROLL   = 10;
const FIXED_DT = AQUEDI_PHYSICS.FIXED_DT;
const PHYSICS_SUBSTEPS = AQUEDI_PHYSICS.SUBSTEPS;
const COYOTE   = 6;

// Convert Aquedi4 1-based image_number to Phaser 0-based frame index.
// Aquedi4 indexes spritesheets column-first (top-to-bottom/y-axis first),
// then row (left-to-right/x-axis). Item.bmp has each sprite duplicated horizontally.
const ITEM_TILE_COLS = 8;   // Number of columns in Item.bmp
const ITEM_TILE_ROWS = 15;   // Number of rows in Item.bmp
const BLOCK_TILE_COLS = 8; // Number of columns in Block.bmp
const BLOCK_TILE_ROWS = 15; // Number of rows in Block.bmp
const SHOT_TILE_COLS = 8;
const SHOT_TILE_ROWS = 30;
const ITEM_BLINK_FRAME_MS = 200;
const SHOT_BLINK_FRAME_MS = 100;
const ACQUIRED_MINI_MS = 1000 / 60 * 20;
const ACQUIRED_MINI_RISE = 18;
const MESSAGE_DEFAULT_MS = 3000;
const MODAL_ZOOM_MS = 1000 / 60 * 12;
const MAX_MESSAGE_W = 636;
const SWORD_SWING_MS = 1000 / 60 * 10;
const SWORD_FRAME_MS = 1000 / 60 * 2;
const PLAYER_ATTACK_FRAME_MS = 1000 / 60 * 10;
const PLAYER_SPRITE_W = 32;
const SWORD_W = 32;
const SWORD_H = 24;
const SWORD_OFFSET_Y = -4;
const EFFECT_FRAME_MS = 1000 / 60;

function itemTileFrame(imageNumber) {
    if (!imageNumber || imageNumber < 1) return 0;
    const idx = imageNumber;
    // Item.bmp is 32x32. Each logical item uses two adjacent columns:
    // frame 0 is the base sprite, frame 1 is the native blink/alternate sprite.
    const col = (idx / ITEM_TILE_ROWS) | 0;
    const row = idx % ITEM_TILE_ROWS;
    return row * (ITEM_TILE_COLS * 2) + col * 2;
}

function itemBlinkFrame(imageNumber, phase) {
    return itemTileFrame(imageNumber) + (phase ? 1 : 0);
}

function blockTileFrame(imageNumber) {
    if (!imageNumber || imageNumber < 1) return 0;
    const idx = imageNumber; // Convert to 0-based
    // Column-first indexing: y-axis (rows) first, then x-axis (cols)
    const col = (idx / BLOCK_TILE_ROWS) | 0;
    const row = idx % BLOCK_TILE_ROWS;
    return row * BLOCK_TILE_COLS + col;
}

function shotTileFrame(imageNumber, phase) {
    if (!imageNumber || imageNumber < 1) return 0;
    const idx = imageNumber;
    const col = (idx / SHOT_TILE_ROWS) | 0;
    const row = idx % SHOT_TILE_ROWS;
    return row * SHOT_TILE_COLS + col * 2 + (phase ? 1 : 0);
}

function stageFrame(imageNumber) {
    return Math.max(0, (imageNumber || 1) - 1);
}

function characterFrame(imageNumber) {
    return Math.max(0, Number(imageNumber || 0) % 15) * 16;
}

function characterInvincibleFrameOffset(character) {
    return character?.invincible ? 1 : 0;
}

function characterTextureKey(imageNumber, imageType) {
    const fromNumber = Math.floor(Number(imageNumber || 0) / 15) + 1;
    const sheet = Math.max(1, Math.min(8, fromNumber || imageType || 1));
    return 'chara_' + sheet;
}

function applyOperator(current, value, operator) {
    switch (operator || 0) {
        case 0: return value;
        case 2: return current + value;
        case 3: return current - value;
        case 4: return current * value;
        case 5: return value ? current / value : current;
        case 6: return value ? current % value : current;
        case 7: return current * value * 0.01;
        default: return value;
    }
}

function frameDurationMs(frame) {
    return Math.max(1, frame?.display_time || 1) * 100;
}

function ceilLog2(n) {
    let k = 0, v = 1;
    while (v < n) { v <<= 1; k++; }
    return k;
}

// Spawn entity with inclusive xmax/ymax bounds. This matches the traced player:
// x=[392.5,407.5], y=[744,767], width=16, height=24.
function makeEntityAtTile(tileX, tileY, cw, ch, layer, options = {}) {
    return PlayerEntity.atTile(tileX, tileY, cw, ch, layer, SCROLL, TILE, options);
}

function cloneAxisOffset(ch, axis, cloneIndex) {
    const base  = Number(ch['appearance_position_offset_' + axis + '_bl'] || 0);
    const clone = Number(ch['appearance_position_offset_' + axis + '_dot'] || 0);
    let offset = base + clone * cloneIndex;
    if (ch['appearance_position_offset_' + axis + '_flip_if_facing_right'] && ch.facing_right) {
        offset = -offset;
    }
    return offset;
}

function paletteBlocks(paletteData) {
    return paletteData?.palette?.blocks || paletteData?.blocks || [];
}

function paletteItems(paletteData) {
    return paletteData?.palette?.items || paletteData?.items || [];
}

function resolveItemDefinition(item, stagePalette, commonPalette) {
    const resolved = { ...(item || {}) };
    const parentItems = item?.inherit_palette === 1 ? paletteItems(commonPalette) :
        item?.inherit_palette === 2 ? paletteItems(stagePalette) : [];
    const parent = parentItems[item?.inherit_palette_data_number];
    if (!parent) return resolved;

    const fields = [
        ['inherit_item_name', ['item_name']],
        ['inherit_initial_position_offset_x', ['appearance_position_offset_x_dot']],
        ['inherit_initial_position_offset_y', ['appearance_position_offset_y_dot']],
        ['inherit_image', ['image_number', 'image_type', 'frame']],
        ['inherit_z_coordinate', ['z_coordinate']],
        ['inherit_transparency', ['transparency']],
        ['inherit_mark', ['mark_display', 'mark_number']],
        ['inherit_gigantic', ['gigantic']],
        ['inherit_acquisition_type', ['acquisition_type']],
        ['inherit_display_above_head_on_acquisition', ['display_above_head_on_acquisition']],
        ['inherit_sound_effect', ['sound_effect']],
        ['inherit_effect', ['item_effects']]
    ];

    for (const [flag, names] of fields) {
        if (!item[flag]) continue;
        for (const name of names) {
            if (Object.prototype.hasOwnProperty.call(parent, name)) resolved[name] = parent[name];
        }
    }
    resolved.parentItem = parent;
    return resolved;
}

function resolveBlockDefinition(block, stagePalette, commonPalette) {
    const resolved = { ...(block || {}) };
    const parentBlocks = block?.inherit_palette === 1 ? paletteBlocks(commonPalette) :
        block?.inherit_palette === 2 ? paletteBlocks(stagePalette) : [];
    const parent = parentBlocks[block?.inherit_palette_data];
    if (!parent) return resolved;

    const fields = [
        ['inherit_block_name', ['name']],
        ['inherit_image', ['image_number', 'image_type']],
        ['inherit_in_front_of_character', ['in_front_of_character']],
        ['inherit_transparency', ['transparency']],
        ['inherit_mark', ['mark_display', 'mark_number']],
        ['inherit_block_type', ['block_type']],
        ['inherit_invalid_faction', ['invalid_faction']],
        ['inherit_action', ['action', 'action_parameter']],
        ['inherit_acquired_item', ['acquired_item_palette', 'acquired_item_palette_data_number']],
        ['inherit_block_summon', ['block_summon_invalid']]
    ];

    for (const [flag, names] of fields) {
        if (!block[flag]) continue;
        for (const name of names) {
            if (Object.prototype.hasOwnProperty.call(parent, name)) resolved[name] = parent[name];
        }
    }
    resolved.parentBlock = parent;
    return resolved;
}

function extractSwordConfig(character) {
    for (const flow of (character?.flows || character?.flow_data || [])) {
        const hasZ = (flow.key_conditions || []).some(condition => condition.z_key);
        if (!hasZ) continue;
        const swordCommand = (flow.commands || flow.command_data || []).find(command => command.type === 12);
        if (!swordCommand) continue;
        const details = swordCommand.details || {};
        return {
            power: Math.max(1, Number(details.power || 1)),
            animation: Number(details.animation || 0),
            executionTime: Math.max(1, Number(details.execution_time || 1)),
            effect: Number(details.effect || 0)
        };
    }
    return { power: 1, animation: 0, executionTime: 3, effect: 0 };
}

export default class StageScene extends Phaser.Scene {
    constructor() {
        super('StageScene');
        this._accum = 0;
    }

    init(data) {
        this._stageFile = data.stageFile || 'StorySample02-1.stg4_1020';
        this._stageKey  = 'stage_' + this._stageFile;
        this._accum     = 0;
        this._player    = null;
        this._actors    = new ActorEntityList();
        this._pickups   = [];
        this._pickupEffects = [];
        this._effects = [];
        this._shots = [];
        this._sword = null;
        this._messageTimer = 0;
        this._messageQueue = [];
        this._floatingMessages = [];
        this._modalMessage = null;
        this._modalWindow = null;
        this._messageWindow = null;
        this._hud = null;
        this._hudDelta = 16.6667;
        this._stageTimerInfinite = true;
        this._stageTimeRemainingMs = 0;
        this._collectionStats = Object.create(null);
        this._lastSpecialBlockTile = null;
    }

    preload() {
        this.load.stg4(this._stageKey, 'data/stg4/' + this._stageFile);
        if (!this.textures.exists('block_tiles'))
            this.load.bmpSpritesheet('block_tiles', 'bmp/Block.bmp', { frameWidth: TILE, frameHeight: TILE });
        if (!this.textures.exists('item_tiles'))
            this.load.bmpSpritesheet('item_tiles', 'bmp/Item.bmp', { frameWidth: TILE, frameHeight: TILE });
        if (!this.textures.exists('item_mini_tiles'))
            this.load.bmpSpritesheet('item_mini_tiles', 'bmp/Item_Mini.bmp', { frameWidth: 16, frameHeight: 16 });
        if (!this.textures.exists('accessory'))
            this.load.bmp('accessory', 'bmp/Accessory.bmp');
        if (!this.textures.exists('word_digits'))
            this.load.bmpSpritesheet('word_digits', 'bmp/Word.bmp', { frameWidth: 32, frameHeight: 32 });
        if (!this.textures.exists('player_stage'))
            this.load.bmpSpritesheet('player_stage', 'bmp/chara_sp/Player01.bmp', { frameWidth: TILE, frameHeight: TILE });
        for (let i = 1; i <= 8; i++) {
            const k = 'chara_' + i;
            if (!this.textures.exists(k))
                this.load.bmpSpritesheet(k, 'bmp/Character' + i + '.bmp', { frameWidth: TILE, frameHeight: TILE });
        }
        if (!this.textures.exists('shot_tiles'))
            this.load.bmpSpritesheet('shot_tiles', 'bmp/Shot.bmp', { frameWidth: 16, frameHeight: 16 });
        if (!this.textures.exists('sword_l'))
            this.load.bmpSpritesheet('sword_l', 'bmp/sword/Sword.bmp', { frameWidth: 32, frameHeight: 24 });
        if (!this.textures.exists('sword_r'))
            this.load.bmpSpritesheet('sword_r', 'bmp/sword/Sword_r.bmp', { frameWidth: 32, frameHeight: 24 });
        if (!this.textures.exists('effect_1_blue'))
            this.load.bmpSpritesheet('effect_1_blue', 'bmp/effect/1_Blue.bmp', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        const cache = this.cache.custom['stg4_1020'];
        const sd    = cache ? cache.get(this._stageKey) : null;
        if (!sd) {
            console.error('Stage not loaded: ' + this._stageFile);
            this.scene.start('WorldMapScene');
            return;
        }
        DataManager.$dataStage = sd;
        DataManager.setupGameObjects?.(sd);

        const cols   = sd.item_width;
        const rows   = sd.height;
        const stride = 1 << ceilLog2(cols + 2 * SCROLL);

        this._cols    = cols;
        this._rows    = rows;
        this._stride  = stride;
        this._physics = AQUEDI_PHYSICS;

        this._buildTileGrid(sd, stride);
        this._setupBackground(sd);
        this._stageTimerInfinite = !sd.enable_time_limit;
        this._stageTimeRemainingMs = Number(sd.time_limit_duration || 0) * 1000;
        this._buildTilemap(cols, rows, stride);
        this._spawnPickups(sd);
        this._spawnCharacters(sd);

        this._applyCameraBounds(sd);
        this.cameras.main.roundPixels = true;
        if (this._player)
            this.cameras.main.startFollow(this._player.sprite, true, 1, 1);

        this._cursors = this.input.keyboard.createCursorKeys();
        this._keyZ    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this._keyX    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.input.keyboard.on('keydown-ESC', () => this.scene.start('WorldMapScene'));

        this._buildHud();
    }

    //-----------------------------------------------------------------------

    _buildTileGrid(sd, stride) {
        const total      = stride * (this._rows + 2 * SCROLL);
        this._attr       = new Uint8Array(total);
        this._visible    = new Uint8Array(total);
        this._cat        = new Uint8Array(total).fill(255);
        this._gfx        = new Int16Array(total).fill(-1);
        this._block      = new Array(total);
        const commonPalette = DataManager.$commonPalette || globalThis.$commonPalette;

        for (const sb of (sd.blocks || [])) {
            const blk   = resolveBlockDefinition(sb.block, sd.palette, commonPalette);
            const ax    = blk.position_x + SCROLL;
            const ay    = blk.position_y + SCROLL;
            if (ax < 0 || ay < 0 || ax >= stride) continue;
            const idx       = ax + ay * stride;
            const visible = this._conditionsMet(blk.display_conditions || []);
            this._visible[idx] = visible ? 1 : 0;
            this._attr[idx] = visible && blk.block_type > 0 ? 1 : 0;
            this._gfx[idx]  = blk.image_number >= 0 ? blk.image_number : -1;
            this._block[idx] = blk;
        }
    }

    _setupBackground(sd) {
        const palette = DataManager.$globalPalette || [];
        for (const bg of (sd.backgrounds || [])) {
            if (!bg.display_from_start) continue;
            if (bg.specified_by_color && palette[bg.color_number] !== undefined) {
                this.cameras.main.setBackgroundColor(palette[bg.color_number]);
                return;
            }
        }
        this.cameras.main.setBackgroundColor(0x000000);
    }

    _buildTilemap(cols, rows, stride) {
        const mapData = [];
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                const idx = (c + SCROLL) + (r + SCROLL) * stride;
                const gfx = this._gfx[idx];
                row.push(this._visible[idx] && gfx > 0 ? blockTileFrame(gfx) : 0);
            }
            mapData.push(row);
        }
        this._map   = this.make.tilemap({ data: mapData, tileWidth: TILE, tileHeight: TILE });
        const ts    = this._map.addTilesetImage('block_tiles', 'block_tiles');
        this._layer = this._map.createLayer(0, ts, SCROLL * TILE, SCROLL * TILE).setDepth(0);
    }

    _conditionsMet(conditions = [], judgmentType = 0) {
        if (!conditions.length) return true;
        const results = conditions.map(condition => this._conditionMet(condition));
        return judgmentType === 1 ? results.some(Boolean) : results.every(Boolean);
    }

    _conditionMet(condition) {
        if (!condition) return true;
        const left = this._conditionOperand(condition, 'left');
        const right = this._conditionOperand(condition, 'right');
        switch (condition.how_to_compare || 0) {
            case 0: return left === right;
            case 1: return left !== right;
            case 2: return left >= right;
            case 3: return left <= right;
            case 4: return left > right;
            case 5: return left < right;
            case 6: return right !== 0 && left % right === 0;
            case 7: return right === 0 || left % right !== 0;
            default: return false;
        }
    }

    _conditionOperand(condition, side) {
        const type = condition[side + '_side_type'] || 0;
        if (type === 0) {
            if (side === 'right') return Number(condition.right_side_constant || 0);
            const varKind = condition.left_side_common_variable_or_stage_variable || 0;
            if (varKind === 0) return DataManager.$gameVariables?.value(condition.left_side_variable_number) || 0;
            return 0;
        }
        if (type === 2 && side === 'right') return Number(condition.right_side_constant || 0);
        return 0;
    }

    _refreshConditionalBlocks() {
        if (!this._block) return;
        for (let idx = 0; idx < this._block.length; idx++) {
            const blk = this._block[idx];
            if (!blk) continue;
            const visible = this._conditionsMet(blk.display_conditions || []);
            this._visible[idx] = visible ? 1 : 0;
            this._attr[idx] = visible && blk.block_type > 0 ? 1 : 0;
            const tile = this._layer?.getTileAt((idx % this._stride) - SCROLL, ((idx / this._stride) | 0) - SCROLL);
            if (tile) tile.index = visible && this._gfx[idx] > 0 ? blockTileFrame(this._gfx[idx]) : 0;
        }
    }

    _applyCameraBounds(sd) {
        const viewTilesX = Math.ceil((this.scale.width || 640) / TILE);
        const viewTilesY = Math.ceil((this.scale.height || 480) / TILE);
        const minX = sd.enable_horizontal_scroll_minimum ? Number(sd.horizontal_scroll_minimum_value || 0) : 0;
        const maxRight = sd.enable_horizontal_scroll_maximum ? Number(sd.horizontal_scroll_maximum_value || sd.item_width - 1) : sd.item_width - 1;
        const minY = sd.enable_vertical_scroll_minimum ? Number(sd.vertical_scroll_minimum_value || 0) : 0;
        const maxBottom = sd.enable_vertical_scroll_maximum ? Number(sd.vertical_scroll_maximum_value || sd.height - 1) : sd.height - 1;
        const left = (SCROLL + minX) * TILE;
        const top = (SCROLL + minY) * TILE;
        const width = Math.max(viewTilesX * TILE, (maxRight - minX + 1) * TILE);
        const height = Math.max(viewTilesY * TILE, (maxBottom - minY + 1) * TILE);
        this.cameras.main.setBounds(left, top, width, height);
    }

    _spawnPickups(sd) {
        const iw = sd.item_collision_width  || 28;
        const ih = sd.item_collision_height || 28;
        for (let i = 0; i < (sd.items || []).length; i++) {
            const si = sd.items[i];
            const it = resolveItemDefinition(si.item, sd.palette, DataManager.$commonPalette || globalThis.$commonPalette);
            const e  = makeEntityAtTile(it.position_x, it.position_y, iw, ih, 0);
            e.sprite   = this.add.sprite(
                (e.xmin + e.xmax) * 0.5, (e.ymin + e.ymax) * 0.5,
                'item_tiles', itemTileFrame(it.image_number)
            ).setDepth(2);
            e.isPickup = true;
            e.renderOffsetY = -3;
            e.item = it;
            e.imageNumber = it.image_number;
            e.acquisitionType = it.acquisition_type || 0;
            e.displayAboveHead = !!it.display_above_head_on_acquisition;
            e.itemAnimElapsed = (i & 1) * 100;
            e.itemAnimFrame = 0;
            e.triggerCooldownMs = 0;
            this._pickups.push(e);
        }
    }

    _spawnCharacters(sd) {
        const pc = sd.player_collide;
        const ec = sd.enemy_collide;
        const resolver = new CharacterInheritanceResolver({
            stagePalette: sd.palette,
            commonPalette: DataManager.$commonPalette || globalThis.$commonPalette
        });

        for (const sc of (sd.characters || [])) {
            const def = resolver.resolve(sc.character);
            const ch  = def.raw;
            const fly = !!ch.flying;

            if (def.isPlayerControlled && !this._player) {
                // Player: use walking_character width/height from hitbox globals.
                // Confirmed IDA: registered CollBox 16x24 for StorySample01 player.
                // coll_w=12 but with sprite offset, AABB is 16x24. Use 16 for now.
                const cw  = fly ? (pc.flying_character_width  || 16) : 16;
                const ch2 = fly ? (pc.flying_character_height || 24) : 24;
                const e   = makeEntityAtTile(ch.position_x, ch.position_y, cw, ch2, 0, {
                    walkSpeed: AQUEDI_PHYSICS.PLAYER_WALK_SPEED,
                    jumpSpeed: AQUEDI_PHYSICS.PLAYER_JUMP_SPEED,
                    speedScalar: AQUEDI_PHYSICS.PLAYER_WALK_SPEED
                });
                e.isPlayer     = true;
                e.flying       = fly;
                e.baseFrame    = stageFrame(ch.image_number);
                e.animationSet = ch.animation_set || 0;
                e.hp = e.maxHp = ch.hp;
                e.sp = e.maxSp = ch.sp;
                e.swordConfig = extractSwordConfig(ch);
                // Player01.bmp faces left in the sheet; flipX mirrors to face right.
                e.facingRight  = !!ch.facing_right;
                e.characterDefinition = def;
                e.renderOffsetY = (e.height - TILE) * 0.5;
                const cx       = (e.xmin + e.xmax) * 0.5;
                const cy       = (e.ymin + e.ymax) * 0.5 + e.renderOffsetY;
                e.sprite       = this.add.sprite(cx, cy, 'player_stage', 0)
                    .setFlipX(!!e.facingRight)
                    .setDepth(5);
                this._player   = e;
            } else if (def.isActor) {
                const cw  = fly ? (ec.flying_character_width  || 12) : (ec.walking_character_width  || 12);
                const ch2 = fly ? (ec.flying_character_height || 16) : (ec.walking_character_height || 24);
                const actionModel = this._extractActorActions(ch);
                const cloneCount = Math.max(1, Number(ch.number_of_doubles || 0) + 1);
                for (let cloneIndex = 0; cloneIndex < cloneCount; cloneIndex++) {
                    const e = new ActorEntity({
                        ...makeEntityAtTile(ch.position_x, ch.position_y, cw, ch2, 1),
                        actions: actionModel.continuous,
                        reactiveActions: actionModel.reactive,
                        facingRight: !!ch.facing_right,
                        cloneIndex,
                        cloneCount
                    });
                    const offsetX = cloneAxisOffset(ch, 'x', cloneIndex);
                    const offsetY = cloneAxisOffset(ch, 'y', cloneIndex);
                    if (offsetX) e.translateX(offsetX);
                    if (offsetY) e.translateY(offsetY);
                    e.isEnemy      = true;
                    e.flying       = fly;
                    e.baseFrame    = characterFrame(ch.image_number) + characterInvincibleFrameOffset(ch);
                    e.animationSet = ch.animation_set || 0;
                    e.hp = e.maxHp = ch.hp;
                    e.facingRight  = !!ch.facing_right;
                    e.directionFixed = !!ch.direction_fixed;
                    e.invincible = !!ch.invincible;
                    e.characterDefinition = def;
                    e.characterName = def.name;
                    e.flowModel = actionModel.flows;
                    e.flowSequences = actionModel.sequences.map(sequence => ({
                        flow: sequence.flow,
                        cursor: 0,
                        waitTicks: cloneIndex * PHYSICS_SUBSTEPS
                    }));
                    e.groupNumber = ch.has_group ? ch.group_number : null;
                    e.bodyHitPower = ch.body_hit_power || 0;
                    e.defense = ch.defense || 0;
                    e.score = ch.score || 0;
                    e.renderOffsetY = fly
                        ? (ch.position_y + SCROLL) * TILE + TILE * 0.5 - (e.ymin + e.ymax) * 0.5
                        : (e.height - TILE) * 0.5;
                    const type     = characterTextureKey(ch.image_number, ch.image_type);
                    const cx       = Math.round((e.xmin + e.xmax) * 0.5);
                    const cy       = Math.round((e.ymin + e.ymax) * 0.5 + e.renderOffsetY);
                    e.sprite       = this.add.sprite(cx, cy, type, e.baseFrame)
                        .setFlipX(!!e.facingRight)
                        .setDepth(3 + (ch.z_coordinate || 0));
                    this._actors.push(e);
                }
            }
        }
    }

    _extractActorActions(ch) {
        const flows = ch.flows || ch.flow_data || [];
        const flowModel = flows.map((flow, index) => ({
            ...flow,
            index,
            commands: (flow.commands || flow.command_data || []).map(command => ({
                ...command,
                flow,
                details: normalizeActorCommandDetails(command)
            }))
        }));
        const continuous = [];
        const reactive = [];
        const sequences = [];
        for (const flow of flowModel) {
            for (const command of flow.commands) {
                if (command.type !== 2 && command.type !== 3 && command.type !== 9 && command.type !== 10) continue;
                if (flow.timing === AQUEDI_FLOW_TIMING.BLOCK_HIT_LR) reactive.push(command);
                else if (flow.timing === AQUEDI_FLOW_TIMING.ALWAYS) continuous.push(command);
            }
            if (flow.timing === AQUEDI_FLOW_TIMING.ALWAYS && flow.commands.some(command => command.type === 11)) {
                sequences.push({ flow, cursor: 0, waitTicks: 0 });
            }
        }
        return { continuous, reactive, flows: flowModel, sequences };
    }

    _buildHud() {
        this._hud = new Window_AquediStageHud(this);
    }

    //-----------------------------------------------------------------------
    // Physics — matching IDA StageScene_State1_Playing order:
    //
    //  Per substep:
    //   1. xmin += velX                                    (Entity_MoveX)
    //   2. Wall collision: L/R order by sign of velX       (Entity_ResolveEnvironmentCollisions)
    //   3. Entity_ApplyGravity                             (uses executable guard fields)
    //   4. ymin += velY                                    (Entity_MoveY)
    //   5. Floor/ceiling: order by sign of velY            (Entity_ResolveFloorAndCeilingCollision)
    //
    // Tile access: idx = (wx/32|0) + (wy/32|0) * stride
    //   Solid: attr[idx] != 0 AND cat[idx] != entity.collLayer
    //
    // Wall snap formulas (Entity_VerticalCollision / Entity_ResolveTileCollisionX):
    //   RIGHT wall: xmin -= (floor(xmax) & 31) + 1
    //   LEFT  wall: xmin += 32 - (floor(xmin) & 31)
    //
    // Floor snap (Entity_OnLand):
    //   IDA: ymin -= (floor(ymax) & 31) + 1
    //   This leaves ymax ≈ tile_top - 1  (1px above tile boundary)
    //   Gravity is not skipped just because onGround is true; floor resolution snaps after MoveY.
    //   Ground detection probes 1px below ymax after the gravity/move step.
    //
    // Ceiling snap (Entity_OnHitCeiling):
    //   ymin += 32 - (floor(ymin) & 31)
    //-----------------------------------------------------------------------

    _solid(wx, wy, layer) {
        if (wx < 0 || wy < 0) return false;
        const tc  = (wx / TILE) | 0;
        const tr  = (wy / TILE) | 0;
        const idx = tc + tr * this._stride;
        if (idx >= this._attr.length) return false;
        return this._attr[idx] !== 0 && this._cat[idx] !== layer;
    }

    _blockAt(wx, wy, layer) {
        if (wx < 0 || wy < 0) return null;
        const tc  = (wx / TILE) | 0;
        const tr  = (wy / TILE) | 0;
        const idx = tc + tr * this._stride;
        if (idx < 0 || idx >= this._attr.length) return null;
        if (this._attr[idx] === 0 || this._cat[idx] === layer) return null;
        return this._block[idx] ? { block: this._block[idx], tileX: tc - SCROLL, tileY: tr - SCROLL } : null;
    }

    // Horizontal edge: probe three evenly-spaced points at height y from x0 to x1.
    _solidH(x0, y, x1, layer) {
        const xm = (x0 + x1) * 0.5;
        return this._solid(x0, y, layer) || this._solid(xm, y, layer) || this._solid(x1, y, layer);
    }

    _blockOnHorizontalEdge(x0, y, x1, layer) {
        const xm = (x0 + x1) * 0.5;
        return this._blockAt(x0, y, layer) || this._blockAt(xm, y, layer) || this._blockAt(x1, y, layer);
    }

    // Vertical edge: probe top and bottom of a column at x.
    _solidV(x, yTop, yBot, layer) {
        return this._solid(x, yTop, layer) || this._solid(x, yBot, layer);
    }

    _blockOnVerticalEdge(x, yTop, yBot, layer) {
        return this._blockAt(x, yTop, layer) || this._blockAt(x, yBot, layer);
    }

    // Entity_VerticalCollision: right wall (vertical scan at x=xmax from ymin to ymax).
    // BUG FIX: use ymax-1 so we don't probe the floor tile when standing on ground.
    _resolveRight(e) {
        const hit = this._blockOnVerticalEdge(e.xmax, e.ymin, e.ymax - 1, e.collLayer);
        if (!hit) return;
        const dx    = -(((e.xmax | 0) & 31) + 1);
        e.translateX(dx);
        e.velX      = 0;
        e.contactR  = true;
        this._applyBlockAction(e, hit, 'right');
    }

    // Entity_ResolveTileCollisionX: left wall (vertical scan at x=xmin from ymin to ymax).
    _resolveLeft(e) {
        const hit = this._blockOnVerticalEdge(e.xmin, e.ymin, e.ymax - 1, e.collLayer);
        if (!hit) return;
        const dx   = 32 - ((e.xmin | 0) & 31);
        e.translateX(dx);
        e.velX     = 0;
        e.contactL = true;
        this._applyBlockAction(e, hit, 'left');
    }

    // Entity_CheckFloorTile + Entity_OnLand.
    // Probe 1px below ymax to detect ground without touching it directly.
    // When solid and falling: apply IDA snap (ymin -= (int(ymax)&31)+1).
    _resolveFloor(e) {
        const probeY = e.ymax + 1;
        const hit = this._blockOnHorizontalEdge(e.xmin, probeY, e.xmax, e.collLayer);
        if (!hit) {
            // No floor below — start falling.
            e.onGround  = false;
            e.airTime++;
            return;
        }
        if (e.velY < 0) {
            // Moving upward through what looks like ground (shouldn't happen but guard it).
            e.onGround = false;
            return;
        }
        // Snap to the top of the floor tile we detected.
        // The floor tile's top boundary is at: (floor(probeY) & ~31)
        // We want ymax to sit exactly at that boundary minus 1 (so ymax = tileTop - 1).
        const tileTop = (probeY | 0) & ~31;
        const dy      = tileTop - 1 - e.ymax;
        // Only snap if we're within a small tolerance to avoid teleporting from far away
        if (dy > -2 && dy <= 2) {
            e.translateY(dy);
        }
        e.velY        = 0;
        e.onGround    = true;
        e.airTime     = 0;
        e.jumpLatch   = 0;
        e.contactB    = true;
        this._applyBlockAction(e, hit, 'floor');
    }

    // Entity_CheckCeilingTile + Entity_OnHitCeiling.
    _resolveCeiling(e) {
        const hit = this._blockOnHorizontalEdge(e.xmin, e.ymin, e.xmax, e.collLayer);
        if (!hit) return;
        const dy  = 32 - ((e.ymin | 0) & 31);
        e.translateY(dy);
        if (e.velY < 0) e.velY = 0;
        e.contactT = true;
        this._applyBlockAction(e, hit, 'ceiling');
    }

    _applyBlockAction(e, hit, side) {
        if (!e?.isPlayer || !hit?.block) return;
        const action = hit.block.action || 0;
        if (!action) return;

        if (action === 1) {
            const key = hit.tileX + ',' + hit.tileY + ':' + side + ':' + action;
            if (this._lastSpecialBlockTile === key && e.velY < 0) return;
            this._lastSpecialBlockTile = key;
            e.startJumpFromHeight(hit.block.action_parameter || 0, 0);
            e.airTime = COYOTE;
            return;
        }

        if (action === 2) {
            e.noJumpTicks = Math.max(e.noJumpTicks || 0, 2);
            return;
        }

        if (action === 4) e.speedX = -commandSpeedToSubstepSpeed(hit.block.action_parameter || 0);
        if (action === 5) e.speedX = commandSpeedToSubstepSpeed(hit.block.action_parameter || 0);
    }

    _stepEntity(e) {
        e.clearContacts();
        e.moveX(this._physics);

        // 2. Wall collisions (Entity_ResolveEnvironmentCollisions).
        // Order: moving right → right wall first; moving left → left wall first.
        if (e.velX >= 0) {
            this._resolveRight(e);
            this._resolveLeft(e);
        } else {
            this._resolveLeft(e);
            this._resolveRight(e);
        }

        if (!e.flying) e.applyGravity(this._physics);
        e.moveY(this._physics);

        // 5. Floor/ceiling (Entity_ResolveFloorAndCeilingCollision).
        // Order: falling → floor first; rising → ceiling first.
        if (e.velY >= 0) {
            this._resolveFloor(e);
            this._resolveCeiling(e);
        } else {
            this._resolveCeiling(e);
            this._resolveFloor(e);
        }
    }

    _updateActorActivation(e) {
        if (!e.sprite) return;
        const view = this.cameras.main.worldView;
        const margin = e.activationMargin ?? TILE * 4;
        e.entityGate4D4 =
            e.xmax >= view.left - margin &&
            e.xmin <= view.right + margin &&
            e.ymax >= view.top - margin &&
            e.ymin <= view.bottom + margin ? 1 : 0;
    }

    _runActorActions(e) {
        if (!e.canRunPhysics()) return;

        this._runReactiveActorActions(e);
        this._runActorFlowSequences(e);

        if (!e.actions.length) return;

        for (const command of e.actions) {
            if (command.type === 2 || command.type === 3) {
                this._runLinearActorCommand(e, command);
            } else if (command.type === 10) {
                this._runJumpActorCommand(e, command.details || {});
            } else if (command.type === 9) {
                this._runDirectionChangeCommand(e, command);
            }
        }
    }

    _runReactiveActorActions(e) {
        if (!e.reactiveActions?.length) return;

        for (const command of e.reactiveActions) {
            const timing = command.flow?.timing ?? 0;
            if (timing === AQUEDI_FLOW_TIMING.BLOCK_HIT_LR && !(e.contactL || e.contactR)) continue;
            this._runDirectionChangeCommand(e, command);
        }
    }

    _runDirectionChangeCommand(e, command) {
        if (command.type !== 9) return;
        const bytes = command.details?.bytes6_42 || [];
        const directionMode = bytes[33] || 0;

        // DirectionChange "Face Away Block".
        if (directionMode === 11 && (e.contactL || e.contactR)) {
            e.facingRight = !!e.contactL;
            if (e.sprite) e.sprite.setFlipX(!!e.facingRight);
        }
    }

    _runLinearActorCommand(e, command) {
        const details = command.details || {};
        const speed = commandSpeedToSubstepSpeed(
            details.time_speed_distance_speed,
            Number(details.time_speed_distance_speed_double || 0) * Number(e.cloneIndex || 0)
        );
        let dir = e.facingRight ? 1 : -1;

        if (details.movement_direction_direction === 4) dir = -1;
        if (details.movement_direction_direction === 6) dir = 1;

        if (command.type === 3 && e.onGround && !this._hasGroundAhead(e, dir)) {
            e.facingRight = !e.facingRight;
            dir = e.facingRight ? 1 : -1;
            if (e.sprite) e.sprite.setFlipX(!!e.facingRight);
        }

        if (!details.movement_direction_invalidate_horizontal_movement) {
            e.speedX = dir * speed;
        }
    }

    _hasGroundAhead(e, dir) {
        const probeX = dir >= 0 ? e.xmax + 1 : e.xmin - 1;
        const probeY = e.ymax + 1;
        return this._solid(probeX, probeY, e.collLayer);
    }

    _runJumpActorCommand(e, details) {
        if (!e.onGround || e.jumpLatch) return;
        const height = details.max_jump_height || 0;
        if (height <= 0) return;
        e.startJumpFromHeight(height);
    }

    _syncSprite(e) {
        if (!e.sprite) return;
        const cx = Math.round((e.xmin + e.xmax) * 0.5 + (e.renderOffsetX || 0));
        const cy = Math.round((e.ymin + e.ymax) * 0.5 + (e.renderOffsetY || 0));
        e.sprite.setPosition(cx, cy);
    }

    _getBasicAnimationSet(e) {
        const sets = DataManager.$dataAnimeSet?.data?.elements || [];
        return sets[e.animationSet || 0] || null;
    }

    _selectBasicAnimation(e) {
        const set = this._getBasicAnimationSet(e);
        if (!set) return null;

        const moving = Math.abs(e.speedX || e.velX || 0) > 0.001;
        const index  = e.flying ? (moving ? 3 : 2) : (moving ? 1 : 0);
        const anim   = set.animations?.[index] || set.animations?.[0] || null;
        if (!anim) return null;

        let offset = 0;
        if (e.flying) offset += set.flying_offset || 0;
        if (e.blocking) offset += set.block_offset || 0;
        if (e.invincible) offset += set.invincibility_offset || 0;

        return { anim, offset, stateKey: index + ':' + offset };
    }

    _updateBasicAnimation(e, delta) {
        if (!e.sprite) return;

        if (e.attackAnimMs > 0) {
            e.attackAnimMs = Math.max(0, e.attackAnimMs - delta);
            e.attackAnimElapsed = (e.attackAnimElapsed || 0) + delta;
            e.sprite.setFrame((e.baseFrame || 0) + 2 + (Math.floor(e.attackAnimElapsed / PLAYER_ATTACK_FRAME_MS) & 1));
            return;
        }

        const selected = this._selectBasicAnimation(e);
        if (!selected || !selected.anim.frames?.length) {
            e.sprite.setFrame(e.baseFrame || 0);
            return;
        }

        if (e.animStateKey !== selected.stateKey) {
            e.animStateKey = selected.stateKey;
            e.animFrame = 0;
            e.animElapsed = 0;
        }

        e.animElapsed = (e.animElapsed || 0) + delta;
        let frame = selected.anim.frames[e.animFrame || 0];
        while (e.animElapsed >= frameDurationMs(frame) && selected.anim.frames.length > 1) {
            e.animElapsed -= frameDurationMs(frame);
            e.animFrame = ((e.animFrame || 0) + 1) % selected.anim.frames.length;
            frame = selected.anim.frames[e.animFrame];
        }

        e.sprite.setFrame((e.baseFrame || 0) + selected.offset + (frame.frame_index || 0));
    }

    _updatePickupAnimation(e, delta) {
        if (!e.sprite || !e.imageNumber) return;
        e.itemAnimElapsed = (e.itemAnimElapsed || 0) + delta;
        while (e.itemAnimElapsed >= ITEM_BLINK_FRAME_MS) {
            e.itemAnimElapsed -= ITEM_BLINK_FRAME_MS;
            e.itemAnimFrame = (e.itemAnimFrame || 0) ^ 1;
        }
        e.sprite.setFrame(itemBlinkFrame(e.imageNumber, e.itemAnimFrame || 0));
    }

    _aabbOverlap(a, b) {
        return a.xmin <= b.xmax && a.xmax >= b.xmin && a.ymin <= b.ymax && a.ymax >= b.ymin;
    }

    _checkPickupCollisions() {
        if (!this._player) return;
        for (const e of this._pickups) {
            if (e.collected) continue;
            const overlapping = this._aabbOverlap(this._player, e);
            if (!overlapping) {
                e.wasOverlapping = false;
                continue;
            }
            if (e.triggerCooldownMs > 0 || e.wasOverlapping) continue;
            e.wasOverlapping = true;
            this._activatePickup(e);
        }
    }

    _checkActorPlayerCollisions() {
        const p = this._player;
        if (!p || p.hp <= 0 || (p.damageCooldownMs || 0) > 0) return;
        for (const actor of this._actors.entities()) {
            if (!actor.active || actor.hp <= 0 || !actor.bodyHitPower) continue;
            if (!this._aabbOverlap(p, actor)) continue;
            this._damagePlayer(Math.max(1, Number(actor.bodyHitPower || 1)), actor);
            break;
        }
    }

    _damagePlayer(amount, source = null) {
        const p = this._player;
        if (!p || p.hp <= 0 || amount <= 0 || (p.damageCooldownMs || 0) > 0) return false;
        p.hp = Math.max(0, p.hp - Math.max(1, amount | 0));
        p.damageCooldownMs = 900;
        p.lastDamageSource = source;
        this._hud?.showPlayerResourceBars(p, 'hp');
        return true;
    }

    _activatePickup(e) {
        const item = e.item || {};
        this._runItemEffects(item);

        if (e.displayAboveHead) {
            this._showAcquiredMini(e);
        }

        if (e.acquisitionType === 1) {
            e.triggerCooldownMs = 700;
            return;
        }

        e.collected = true;
        if (e.sprite) e.sprite.destroy();
    }

    _runItemEffects(item) {
        const effects = item.item_effects || [];
        if (item.item_name) {
            this._collectionStats[item.item_name] = (this._collectionStats[item.item_name] || 0) + 1;
        }

        for (const effect of effects) {
            const details = effect.details || {};
            if (effect.type === 4) {
                this._showMessage(details.message || '', details);
            } else if (effect.type === 7) {
                this._applyStatusOperation(details, item);
            } else if (effect.type === 2) {
                this._showMessage('STAGE CLEAR', { display_time: 30 });
            }
        }
    }

    _applyStatusOperation(details, item) {
        const value = this._statusOperand(details);

        if (details.operation_target_type === 1 && details.operation_target_variable_type === 0) {
            const id = details.operation_target_variable_number || 0;
            const current = DataManager.$gameVariables?.value(id) || 0;
            DataManager.$gameVariables?.setValue(id, applyOperator(current, value, details.operator_type));
            this._refreshConditionalBlocks();
            return;
        }

        if (!this._player || !value) return;
        if (item.image_number === 15 || item.image_number === 16) {
            this._player.hp = Math.min(this._player.maxHp, this._player.hp + value);
        }
    }

    _runActorFlowSequences(e) {
        if (!e.flowSequences?.length) return;
        for (const sequence of e.flowSequences) {
            if (sequence.waitTicks > 0) {
                sequence.waitTicks--;
                continue;
            }
            const commands = sequence.flow.commands || [];
            const command = commands[sequence.cursor % commands.length];
            if (!command) continue;
            if (command.type === 1) {
                sequence.waitTicks = Math.max(1, (command.details?.execution_time || 1) * PHYSICS_SUBSTEPS * 6);
            } else if (command.type === 11) {
                if (command.details?.animation) {
                    e.attackAnimMs = Math.max(e.attackAnimMs || 0, (command.details.execution_time || 1) * 100);
                    e.attackAnimElapsed = 0;
                }
                this._spawnShot(e, command.details || {});
            }
            sequence.cursor++;
        }
    }

    _spawnShot(owner, details) {
        if (!this.textures.exists('shot_tiles')) return;
        const count = Math.max(1, Number(details.number_of_shots_fired || 1));
        const dir = owner.facingRight ? 1 : -1;
        for (let i = 0; i < count; i++) {
            let x = Math.round((owner.xmin + owner.xmax) * 0.5);
            let y = Math.round((owner.ymin + owner.ymax) * 0.5);
            let ox = Number(details.firing_position_offset_x || 0) + i * Number(details.firing_position_offset_x_double || 0);
            const oy = Number(details.firing_position_offset_y || 0) + i * Number(details.firing_position_offset_y_double || 0);
            if (details.firing_position_offset_x_flip_if_facing_right && owner.facingRight) ox = -ox;
            x += ox;
            y += oy;
            const sprite = this.add.sprite(x, y, 'shot_tiles', shotTileFrame(details.graphic || 1, 0))
                .setFlipX(dir > 0)
                .setDepth(6 + (details.z_coordinate || 0));
            this._shots.push({
                sprite,
                x,
                y,
                vx: dir * commandSpeedToSubstepSpeed(details.speed || 0, 0),
                vy: 0,
                imageNumber: details.graphic || 1,
                animElapsed: 0,
                animFrame: 0,
                power: details.power || 1,
                owner,
                lifetime: details.disappearance_time_valid ? Math.max(1, details.disappearance_time * 6 * PHYSICS_SUBSTEPS) : Number.POSITIVE_INFINITY,
                penetrateBlocks: !!details.penetrate_blocks
            });
        }
    }

    _statusOperand(details) {
        if ((details.calculation_content_type || 0) === 0) {
            return Number(details.calculation_content_constant || 0);
        }
        if (details.calculation_content_type === 1 && details.calculation_content_variable_type === 0) {
            return DataManager.$gameVariables?.value(details.calculation_content_variable_number) || 0;
        }
        if (details.calculation_content_type === 2) {
            const min = Number(details.calculation_content_random_lower_limit || 0);
            const max = Number(details.calculation_content_random_upper_limit || min);
            return min + Math.floor(Math.random() * (max - min + 1));
        }
        return 0;
    }

    _showAcquiredMini(e) {
        if (!this._player || !this.textures.exists('item_mini_tiles')) return;
        const p = this._player;
        const startY = e.sprite ? e.sprite.y : Math.round((e.ymin + e.ymax) * 0.5 + (e.renderOffsetY || 0));
        const sprite = this.add.sprite(
            Math.round((p.xmin + p.xmax) * 0.5),
            Math.round(startY),
            'item_mini_tiles',
            itemBlinkFrame(e.imageNumber, 0)
        ).setDepth(18);

        this._pickupEffects.push({
            sprite,
            imageNumber: e.imageNumber,
            startY,
            elapsed: 0,
            animElapsed: 0,
            animFrame: 0
        });
    }

    _updatePickupEffects(delta) {
        const p = this._player;
        for (let i = this._pickupEffects.length - 1; i >= 0; i--) {
            const fx = this._pickupEffects[i];
            fx.elapsed += delta;
            fx.animElapsed += delta;
            while (fx.animElapsed >= ITEM_BLINK_FRAME_MS) {
                fx.animElapsed -= ITEM_BLINK_FRAME_MS;
                fx.animFrame ^= 1;
            }
            if (fx.elapsed >= ACQUIRED_MINI_MS || !p) {
                fx.sprite.destroy();
                this._pickupEffects.splice(i, 1);
                continue;
            }
            const t = fx.elapsed / ACQUIRED_MINI_MS;
            const eased = 1 - (1 - t) * (1 - t);
            fx.sprite
                .setFrame(itemBlinkFrame(fx.imageNumber, fx.animFrame))
                .setPosition(
                    Math.round((p.xmin + p.xmax) * 0.5),
                    Math.round(fx.startY - ACQUIRED_MINI_RISE * eased)
                )
                .setScale(1 + 0.35 * Math.sin(Math.PI * t))
                .setAlpha(1 - Math.max(0, t - 0.75) / 0.25);
        }
    }

    _showMessage(message, details = {}) {
        if (!message) return;
        if (details.pause || details.display_time_specification_method === 0) {
            this._showModalMessage(message, details);
            return;
        }
        if (details.display_position_specification_method === 4) {
            this._showFloatingMessage(message, details);
            return;
        }
        if (this._messageTimer > 0) {
            this._messageQueue.push({ message, details });
            return;
        }
        this._displayMessage(message, details);
    }

    _displayMessage(message, details = {}) {
        const duration = details.display_time ? details.display_time * 100 : MESSAGE_DEFAULT_MS;
        if (this._messageWindow) this._messageWindow.destroy();
        const w = this.scale.width || 640;
        this._messageWindow = createAquediMessageWindow(this, message, Math.round(w * 0.5), 184, {
            origin: { x: 0.5, y: 0.5 },
            maxTextWidth: MAX_MESSAGE_W,
            scrollFactor: 0,
            depth: 30
        });
        this._messageTimer = Math.max(duration, 500);
    }

    _showFloatingMessage(message, details = {}) {
        if (!this._player) return;
        const duration = details.display_time ? details.display_time * 100 : MESSAGE_DEFAULT_MS;
        const pos = this._floatingMessagePosition(message);
        const window = createAquediMessageWindow(this, message, pos.x, pos.y, {
            origin: { x: 0.5, y: 1 },
            maxTextWidth: Math.min(MAX_MESSAGE_W, this.cameras.main.worldView.width - 8),
            depth: 21
        });

        this._floatingMessages.push({
            window,
            message,
            elapsed: 0,
            duration: Math.max(duration, 500)
        });
    }

    _floatingMessagePosition(message = '') {
        const p = this._player;
        const view = this.cameras.main.worldView;
        const metrics = measureAquediText(message);
        const approxWidth = Math.min(Math.max(32, metrics.windowWidth), view.width - 8);
        const half = approxWidth * 0.5;
        const x = Phaser.Math.Clamp(
            Math.round((p.xmin + p.xmax) * 0.5),
            Math.round(view.left + half + 4),
            Math.round(view.right - half - 4)
        );
        const y = Phaser.Math.Clamp(
            Math.round(p.ymin - 24),
            Math.round(view.top + 20),
            Math.round(view.bottom - 4)
        );
        return { x, y };
    }

    _updateFloatingMessages(delta) {
        const p = this._player;
        for (let i = this._floatingMessages.length - 1; i >= 0; i--) {
            const msg = this._floatingMessages[i];
            msg.elapsed += delta;
            if (msg.elapsed >= msg.duration || !p) {
                msg.window.destroy();
                this._floatingMessages.splice(i, 1);
                continue;
            }
            const pos = this._floatingMessagePosition(msg.message);
            msg.window.setPosition(pos.x, pos.y);
        }
    }

    _showModalMessage(message, details = {}) {
        if (this._modalMessage || this._messageTimer > 0) {
            this._messageQueue.push({ message, details });
            return;
        }

        const w = this.scale.width || 320;
        const h = this.scale.height || 240;
        if (this._modalWindow) this._modalWindow.destroy();
        this._modalWindow = createAquediMessageWindow(this, message, Math.round(w * 0.5), Math.round(h * 0.5), {
            origin: { x: 0.5, y: 0.5 },
            maxTextWidth: Math.min(MAX_MESSAGE_W, w - 4),
            scrollFactor: 0,
            depth: 30
        });
        this._modalWindow.setScale(0.2);
        this._modalWindow.text.setVisible(false);
        this._modalMessage = {
            elapsed: 0,
            waitForKey: true
        };
    }

    _closeModalMessage() {
        this._modalMessage = null;
        if (this._modalWindow) {
            this._modalWindow.destroy();
            this._modalWindow = null;
        }
        const next = this._messageQueue.shift();
        if (next) this._showMessage(next.message, next.details);
    }

    _updateMessage(delta) {
        if (this._modalMessage) {
            this._modalMessage.elapsed += delta;
            const scale = Math.min(1, Math.max(0.2, this._modalMessage.elapsed / MODAL_ZOOM_MS));
            if (this._modalWindow) {
                this._modalWindow.setScale(scale);
                this._modalWindow.text.setVisible(scale >= 1);
            }
            if (this._keyZ && Phaser.Input.Keyboard.JustDown(this._keyZ)) {
                this._closeModalMessage();
            }
            return;
        }
        if (!this._messageTimer) return;
        this._messageTimer = Math.max(0, this._messageTimer - delta);
        if (this._messageTimer === 0) {
            const next = this._messageQueue.shift();
            if (next) {
                this._showMessage(next.message, next.details);
                return;
            }
            if (this._messageWindow) {
                this._messageWindow.destroy();
                this._messageWindow = null;
            }
        }
    }

    //-----------------------------------------------------------------------
    // Player input.
    // IDA: vel_x is zeroed each frame by sub_4A19D0 (vftable+76), then the
    // LinearMovement command sets it directly to +/- walk speed.
    // No gradual acceleration — instant velocity, instant stop.
    // Stopping ease controls knockback/slide decay (entity+648), not walk accel.
    //-----------------------------------------------------------------------

    _handleInput(e) {
        let dx = 0;
        if (this._cursors.left.isDown)  dx = -1;
        if (this._cursors.right.isDown) dx = +1;

        // Vel_x set directly (no accumulation — mirrors IDA clearing velX each frame).
        e.setHorizontalInput(dx);

        if (dx !== 0 && e.sprite) {
            // Player01.bmp default facing: RIGHT.
            // flipX=false → facing right, flipX=true → facing left.
            e.facingRight = dx > 0;
            e.sprite.setFlipX(dx > 0);
        }

        if (Phaser.Input.Keyboard.JustDown(this._keyZ)) {
            this._startSwordAttack(e);
        }

        // Jump: allowed within coyote window.
        // IDA: in_air flag only sets after g_max_air_time_frames (many frames).
        // We use a small coyote window so the player can jump just after stepping off an edge.
        const jumpBlocked = (e.noJumpTicks || 0) > 0;
        if (Phaser.Input.Keyboard.JustDown(this._keyX) && e.airTime < COYOTE && !jumpBlocked) {
            e.jump();
            e.airTime  = COYOTE; // block double-jump until landing resets airTime
        }
        if (e.noJumpTicks > 0) e.noJumpTicks--;
    }

    _startSwordAttack(e) {
        if (!e || this._sword?.active) return;
        const texture = e.facingRight ? 'sword_r' : 'sword_l';
        if (!this.textures.exists(texture)) return;
        const sprite = this.add.sprite(0, 0, texture, 0).setDepth(7);
        this._sword = {
            active: true,
            owner: e,
            sprite,
            elapsed: 0,
            power: Math.max(1, Number(e.swordConfig?.power || 1)),
            hitActors: new Set()
        };
        e.attackAnimMs = SWORD_SWING_MS;
        e.attackAnimElapsed = 0;
        this._positionSword();
        this._applySwordHits();
    }

    _positionSword() {
        const sword = this._sword;
        const p = sword?.owner;
        if (!sword?.active || !p) return;
        const box = this._swordAabb();
        sword.sprite.setTexture(p.facingRight ? 'sword_r' : 'sword_l');
        sword.sprite.setPosition(
            Math.round((box.xmin + box.xmax) * 0.5),
            Math.round((box.ymin + box.ymax) * 0.5)
        );
    }

    _swordAabb() {
        const p = this._sword?.owner;
        if (!p) return null;
        const dir = p.facingRight ? 1 : -1;
        const playerCenterX = (p.xmin + p.xmax) * 0.5;
        const playerCenterY = (p.ymin + p.ymax) * 0.5;
        const playerLeft = playerCenterX - PLAYER_SPRITE_W * 0.5;
        const playerRight = playerCenterX + PLAYER_SPRITE_W * 0.5;
        const xmin = dir > 0 ? playerRight : playerLeft - SWORD_W;
        const cy = playerCenterY + SWORD_OFFSET_Y;
        return {
            xmin,
            xmax: xmin + SWORD_W - 1,
            ymin: cy - SWORD_H * 0.5,
            ymax: cy + SWORD_H * 0.5 - 1
        };
    }

    _applySwordHits() {
        const sword = this._sword;
        const box = this._swordAabb();
        if (!sword?.active || !box) return;
        for (const actor of this._actors.entities()) {
            if (!actor.active || actor.hp <= 0 || sword.hitActors.has(actor)) continue;
            if (!this._aabbOverlap(box, actor)) continue;
            sword.hitActors.add(actor);
            if (actor.invincible) continue;
            const damage = Math.max(1, sword.power - (actor.defense || 0));
            actor.hp = Math.max(0, actor.hp - damage);
            if (actor.hp <= 0) {
                this._spawnEffect(sword.owner?.swordConfig?.effect || 3, (actor.xmin + actor.xmax) * 0.5, (actor.ymin + actor.ymax) * 0.5);
                actor.sprite?.destroy();
                this._actors.remove(actor);
            }
        }
    }

    _updateSword(delta) {
        const sword = this._sword;
        if (!sword?.active) return;
        sword.elapsed += delta;
        this._positionSword();
        this._applySwordHits();
        const frame = Math.min(2, Math.floor(sword.elapsed / SWORD_FRAME_MS));
        sword.sprite.setFrame(frame);
        if (sword.elapsed >= SWORD_SWING_MS) {
            sword.sprite.destroy();
            this._sword = null;
        }
    }

    _spawnEffect(effectId, x, y) {
        if (effectId !== 3 || !this.textures.exists('effect_1_blue')) return;
        const sprite = this.add.sprite(Math.round(x), Math.round(y), 'effect_1_blue', 0)
            .setDepth(8);
        this._effects.push({
            sprite,
            frame: 0,
            elapsed: 0
        });
    }

    _updateEffects(delta) {
        for (let i = this._effects.length - 1; i >= 0; i--) {
            const effect = this._effects[i];
            effect.elapsed += delta;
            while (effect.elapsed >= EFFECT_FRAME_MS) {
                effect.elapsed -= EFFECT_FRAME_MS;
                effect.frame++;
            }
            if (effect.frame >= 3) {
                effect.sprite.destroy();
                this._effects.splice(i, 1);
                continue;
            }
            effect.sprite.setFrame(effect.frame);
        }
    }

    //-----------------------------------------------------------------------

    update(time, delta) {
        if (this._modalMessage) {
            this._updateMessage(delta);
            return;
        }
        this._hudDelta = delta;
        if (!this._stageTimerInfinite) {
            this._stageTimeRemainingMs = Math.max(0, this._stageTimeRemainingMs - delta);
        }
        if (this._player?.damageCooldownMs > 0) {
            this._player.damageCooldownMs = Math.max(0, this._player.damageCooldownMs - delta);
        }

        // Handle player input ONCE per frame (not per substep) to avoid multiple jumps.
        if (this._player) this._handleInput(this._player);

        this._accum += delta / 1000;
        let steps    = 0;
        while (this._accum >= FIXED_DT && steps < 5) {
            // if (this._player) this._handleInput(this._player);

            // Physics substeps - no input polling here.
            for (let substep = 0; substep < PHYSICS_SUBSTEPS; substep++) {
                if (this._player) this._stepEntity(this._player);
                for (const e of this._actors.entities()) {
                    this._updateActorActivation(e);
                    this._runActorActions(e);
                    if (e.active && e.canRunPhysics()) this._stepEntity(e);
                }
                this._checkPickupCollisions();
                this._checkActorPlayerCollisions();
                this._updateShots();
            }

            this._accum -= FIXED_DT;
            steps++;
        }

        if (this._player) {
            this._syncSprite(this._player);
            this._updateBasicAnimation(this._player, delta);
        }
        for (const e of this._actors.entities()) {
            this._syncSprite(e);
            this._updateBasicAnimation(e, delta);
        }
        for (const e of this._pickups) {
            if (e.collected) continue;
            if (e.triggerCooldownMs > 0) e.triggerCooldownMs = Math.max(0, e.triggerCooldownMs - delta);
            this._syncSprite(e);
            this._updatePickupAnimation(e, delta);
        }
        for (const shot of this._shots) {
            if (shot.sprite) {
                shot.animElapsed = (shot.animElapsed || 0) + delta;
                while (shot.animElapsed >= SHOT_BLINK_FRAME_MS) {
                    shot.animElapsed -= SHOT_BLINK_FRAME_MS;
                    shot.animFrame ^= 1;
                }
                shot.sprite
                    .setFrame(shotTileFrame(shot.imageNumber, shot.animFrame))
                    .setPosition(Math.round(shot.x), Math.round(shot.y));
            }
        }
        this._updateSword(delta);
        this._updateEffects(delta);
        this._updatePickupEffects(delta);
        this._updateFloatingMessages(delta);
        this._updateMessage(delta);

        this._updateHud();
    }

    _updateHud() {
        if (!this._hud || !this._player) return;
        const p  = this._player;
        const cx = (p.xmin + p.xmax) * 0.5;
        const cy = (p.ymin + p.ymax) * 0.5;
        const tx = ((cx / TILE) | 0) - SCROLL;
        const ty = ((cy / TILE) | 0) - SCROLL;
        this._hud.update(p, {
            delta: this._hudDelta,
            itemCount: Object.values(this._collectionStats).reduce((sum, n) => sum + n, 0),
            score: Object.values(this._collectionStats).reduce((sum, n) => sum + n, 0),
            timer: this._stageTimerInfinite ? null : Math.ceil(this._stageTimeRemainingMs / 1000),
            tileX: tx,
            tileY: ty
        });
    }

    _updateShots() {
        for (let i = this._shots.length - 1; i >= 0; i--) {
            const shot = this._shots[i];
            shot.x += shot.vx;
            shot.y += shot.vy;
            shot.lifetime--;
            const hitBlock = !shot.penetrateBlocks && this._solid(shot.x, shot.y, 0);
            const hitPlayer = this._player && this._pointInEntity(shot.x, shot.y, this._player);
            if (hitPlayer) this._damagePlayer(shot.power || 1, shot.owner || shot);
            if (shot.lifetime <= 0 || hitBlock || hitPlayer) {
                shot.sprite?.destroy();
                this._shots.splice(i, 1);
            }
        }
    }

    _pointInEntity(x, y, e) {
        return x >= e.xmin && x <= e.xmax && y >= e.ymin && y <= e.ymax;
    }
}
