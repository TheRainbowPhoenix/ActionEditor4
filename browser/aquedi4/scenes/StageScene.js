// scenes/StageScene.js
import { DataManager } from '../managers/DataManager.js';
import {
    ActorEntity,
    ActorEntityList,
    AQUEDI_PHYSICS,
    PlayerEntity,
    commandSpeedToSubstepSpeed
} from '../objects/AquediPhysics.js';

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
const ITEM_BLINK_FRAME_MS = 200;

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
    console.log(imageNumber);
    if (!imageNumber || imageNumber < 1) return 0;
    const idx = imageNumber; // Convert to 0-based
    // Column-first indexing: y-axis (rows) first, then x-axis (cols)
    const col = (idx / BLOCK_TILE_ROWS) | 0;
    const row = idx % BLOCK_TILE_ROWS;
    return row * BLOCK_TILE_COLS + col;
}

function stageFrame(imageNumber) {
    return Math.max(0, (imageNumber || 1) - 1);
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

export default class StageScene extends Phaser.Scene {
    constructor() {
        super('StageScene');
        this._accum = 0;
    }

    init(data) {
        this._stageFile = data.stageFile || 'StorySample01.stg4_1020';
        this._stageKey  = 'stage_' + this._stageFile;
        this._accum     = 0;
        this._player    = null;
        this._actors    = new ActorEntityList();
        this._pickups   = [];
    }

    preload() {
        this.load.stg4(this._stageKey, 'data/stg4/' + this._stageFile);
        if (!this.textures.exists('block_tiles'))
            this.load.bmpSpritesheet('block_tiles', 'bmp/Block.bmp', { frameWidth: TILE, frameHeight: TILE });
        if (!this.textures.exists('item_tiles'))
            this.load.bmpSpritesheet('item_tiles', 'bmp/Item.bmp', { frameWidth: TILE, frameHeight: TILE });
        if (!this.textures.exists('player_stage'))
            this.load.bmpSpritesheet('player_stage', 'bmp/chara_sp/Player01.bmp', { frameWidth: TILE, frameHeight: TILE });
        for (let i = 1; i <= 8; i++) {
            const k = 'chara_' + i;
            if (!this.textures.exists(k))
                this.load.bmpSpritesheet(k, 'bmp/Character' + i + '.bmp', { frameWidth: TILE, frameHeight: TILE });
        }
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

        const cols   = sd.item_width;
        const rows   = sd.height;
        const stride = 1 << ceilLog2(cols + 2 * SCROLL);

        this._cols    = cols;
        this._rows    = rows;
        this._stride  = stride;
        this._physics = AQUEDI_PHYSICS;

        this._buildTileGrid(sd, stride);
        this._setupBackground(sd);
        this._buildTilemap(cols, rows, stride);
        this._spawnPickups(sd);
        this._spawnCharacters(sd);

        this.cameras.main.setBounds(SCROLL * TILE, SCROLL * TILE, cols * TILE, rows * TILE);
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
        this._cat        = new Uint8Array(total).fill(255);
        this._gfx        = new Int16Array(total).fill(-1);

        for (const sb of (sd.blocks || [])) {
            const blk   = sb.block;
            const ax    = blk.position_x + SCROLL;
            const ay    = blk.position_y + SCROLL;
            if (ax < 0 || ay < 0 || ax >= stride) continue;
            const idx       = ax + ay * stride;
            this._attr[idx] = blk.block_type > 0 ? 1 : 0;
            this._gfx[idx]  = blk.image_number >= 0 ? blk.image_number : -1;
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
                row.push(gfx > 0 ? blockTileFrame(gfx) : 0);
            }
            mapData.push(row);
        }
        this._map   = this.make.tilemap({ data: mapData, tileWidth: TILE, tileHeight: TILE });
        const ts    = this._map.addTilesetImage('block_tiles', 'block_tiles');
        this._layer = this._map.createLayer(0, ts, SCROLL * TILE, SCROLL * TILE).setDepth(0);
    }

    _spawnPickups(sd) {
        const iw = sd.item_collision_width  || 28;
        const ih = sd.item_collision_height || 28;
        for (let i = 0; i < (sd.items || []).length; i++) {
            const si = sd.items[i];
            const it = si.item;
            const e  = makeEntityAtTile(it.position_x, it.position_y, iw, ih, 0);
            e.sprite   = this.add.sprite(
                (e.xmin + e.xmax) * 0.5, (e.ymin + e.ymax) * 0.5,
                'item_tiles', itemTileFrame(it.image_number)
            ).setDepth(2);
            e.isPickup = true;
            e.renderOffsetY = -2;
            e.imageNumber = it.image_number;
            e.itemAnimElapsed = (i & 1) * 100;
            e.itemAnimFrame = 0;
            this._pickups.push(e);
        }
    }

    _spawnCharacters(sd) {
        const pc = sd.player_collide;
        const ec = sd.enemy_collide;

        for (const sc of (sd.characters || [])) {
            const ch  = sc.character;
            const fly = !!ch.flying;

            if (ch.faction === 0 && ch.operation === 0 && !this._player) {
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
                // Player01.bmp faces right by default; flipX mirrors to face left.
                e.facingRight  = !!ch.facing_right;
                e.renderOffsetY = (e.height - TILE) * 0.5;
                const cx       = (e.xmin + e.xmax) * 0.5;
                const cy       = (e.ymin + e.ymax) * 0.5 + e.renderOffsetY;
                e.sprite       = this.add.sprite(cx, cy, 'player_stage', 0)
                    .setFlipX(!!e.facingRight)
                    .setDepth(5);
                this._player   = e;
            } else if (!(ch.faction === 0 && ch.operation === 0)) {
                const cw  = fly ? (ec.flying_character_width  || 12) : (ec.walking_character_width  || 12);
                const ch2 = fly ? (ec.flying_character_height || 16) : (ec.walking_character_height || 24);
                const e   = new ActorEntity({
                    ...makeEntityAtTile(ch.position_x, ch.position_y, cw, ch2, 1),
                    actions: this._extractActorActions(ch),
                    facingRight: !!ch.facing_right
                });
                e.isEnemy      = true;
                e.flying       = fly;
                e.baseFrame    = stageFrame(ch.image_number);
                e.animationSet = ch.animation_set || 0;
                e.hp = e.maxHp = ch.hp;
                e.facingRight  = !!ch.facing_right;
                e.renderOffsetY = (e.height - TILE) * 0.5;
                const type     = Math.max(1, Math.min(8, ch.image_type || 1));
                const cx       = (e.xmin + e.xmax) * 0.5;
                const cy       = (e.ymin + e.ymax) * 0.5 + e.renderOffsetY;
                e.sprite       = this.add.sprite(cx, cy, 'chara_' + type, e.baseFrame)
                    .setFlipX(!!e.facingRight)
                    .setDepth(4);
                this._actors.push(e);
            }
        }
    }

    _extractActorActions(ch) {
        const flows = ch.flows || ch.flow_data || [];
        const commands = [];
        for (const flow of flows) {
            for (const command of (flow.commands || flow.command_data || [])) {
                if (command.type === 2 || command.type === 3 || command.type === 10) {
                    commands.push(command);
                }
            }
        }
        return commands;
    }

    _buildHud() {
        this._hudText = this.add.text(8, 8, '', {
            font: '12px monospace', fill: '#ffffff',
            stroke: '#000000', strokeThickness: 2
        }).setScrollFactor(0).setDepth(20);
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

    // Horizontal edge: probe three evenly-spaced points at height y from x0 to x1.
    _solidH(x0, y, x1, layer) {
        const xm = (x0 + x1) * 0.5;
        return this._solid(x0, y, layer) || this._solid(xm, y, layer) || this._solid(x1, y, layer);
    }

    // Vertical edge: probe top and bottom of a column at x.
    _solidV(x, yTop, yBot, layer) {
        return this._solid(x, yTop, layer) || this._solid(x, yBot, layer);
    }

    // Entity_VerticalCollision: right wall (vertical scan at x=xmax from ymin to ymax).
    // BUG FIX: use ymax-1 so we don't probe the floor tile when standing on ground.
    _resolveRight(e) {
        if (!this._solidV(e.xmax, e.ymin, e.ymax - 1, e.collLayer)) return;
        const dx    = -(((e.xmax | 0) & 31) + 1);
        e.translateX(dx);
        e.velX      = 0;
        e.contactR  = true;
    }

    // Entity_ResolveTileCollisionX: left wall (vertical scan at x=xmin from ymin to ymax).
    _resolveLeft(e) {
        if (!this._solidV(e.xmin, e.ymin, e.ymax - 1, e.collLayer)) return;
        const dx   = 32 - ((e.xmin | 0) & 31);
        e.translateX(dx);
        e.velX     = 0;
        e.contactL = true;
    }

    // Entity_CheckFloorTile + Entity_OnLand.
    // Probe 1px below ymax to detect ground without touching it directly.
    // When solid and falling: apply IDA snap (ymin -= (int(ymax)&31)+1).
    _resolveFloor(e) {
        const probeY = e.ymax + 1;
        if (!this._solidH(e.xmin, probeY, e.xmax, e.collLayer)) {
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
        e.contactB    = true;
    }

    // Entity_CheckCeilingTile + Entity_OnHitCeiling.
    _resolveCeiling(e) {
        if (!this._solidH(e.xmin, e.ymin, e.xmax, e.collLayer)) return;
        const dy  = 32 - ((e.ymin | 0) & 31);
        e.translateY(dy);
        if (e.velY < 0) e.velY = 0;
        e.contactT = true;
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
        if (!e.actions.length || !e.canRunPhysics()) return;

        const command = e.actions[e.actionCursor % e.actions.length];
        if (!command) return;

        if (command.type === 2 || command.type === 3) {
            this._runLinearActorCommand(e, command.details || {});
        } else if (command.type === 10) {
            this._runJumpActorCommand(e, command.details || {});
        }

        e.actionTicks++;
        const duration = Math.max(1, (command.details?.execution_time || 1) * PHYSICS_SUBSTEPS);
        if (e.actionTicks >= duration) {
            e.actionTicks = 0;
            e.actionCursor++;
        }
    }

    _runLinearActorCommand(e, details) {
        const speed = commandSpeedToSubstepSpeed(
            details.time_speed_distance_speed,
            details.time_speed_distance_speed_double && e.formVariant ? details.time_speed_distance_speed_double : 0
        );
        let dir = e.facingRight ? 1 : -1;

        if (details.movement_direction_direction === 4) dir = -1;
        if (details.movement_direction_direction === 6) dir = 1;
        if (details.movement_direction_reverse_speed_if_direction_changes && (e.contactL || e.contactR)) {
            e.facingRight = !e.facingRight;
            dir = e.facingRight ? 1 : -1;
            if (e.sprite) e.sprite.setFlipX(!!e.facingRight);
        }

        if (!details.movement_direction_invalidate_horizontal_movement) {
            e.speedX = dir * speed;
        }
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
            e.sprite.setFlipX(dx > 0);
        }

        // Jump: allowed within coyote window.
        // IDA: in_air flag only sets after g_max_air_time_frames (many frames).
        // We use a small coyote window so the player can jump just after stepping off an edge.
        if (Phaser.Input.Keyboard.JustDown(this._keyX) && e.airTime < COYOTE) {
            e.jump();
            e.airTime  = COYOTE; // block double-jump until landing resets airTime
        }
    }

    //-----------------------------------------------------------------------

    update(time, delta) {
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
            this._syncSprite(e);
            this._updatePickupAnimation(e, delta);
        }

        this._updateHud();
    }

    _updateHud() {
        if (!this._hudText || !this._player) return;
        const p  = this._player;
        const cx = (p.xmin + p.xmax) * 0.5;
        const cy = (p.ymin + p.ymax) * 0.5;
        const tx = ((cx / TILE) | 0) - SCROLL;
        const ty = ((cy / TILE) | 0) - SCROLL;
        this._hudText.setText(
            'HP:' + p.hp + '/' + p.maxHp +
            '  SP:' + p.sp + '/' + p.maxSp +
            '  tile:(' + tx + ',' + ty + ')' +
            '  velY:' + p.velY.toFixed(2) +
            (p.onGround ? '  GND' : '  AIR(t=' + p.airTime + ')')
        );
    }
}
