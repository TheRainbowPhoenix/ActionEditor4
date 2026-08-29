// scenes/StageScene.js
import { DataManager } from '../managers/DataManager.js';
import { AQUEDI_PHYSICS, PlayerEntity } from '../objects/AquediPhysics.js';

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

function itemTileFrame(imageNumber) {
    if (!imageNumber || imageNumber < 1) return 0;
    const idx = imageNumber; // Convert to 0-based
    // Each sprite is duplicated on x-axis, so column stride is 2
    const col = (idx / ITEM_TILE_ROWS) | 0;
    const row = idx % ITEM_TILE_ROWS;
    return row * (ITEM_TILE_COLS * 2) + col * 2;
}

function blockTileFrame(imageNumber) {
    if (!imageNumber || imageNumber < 1) return 0;
    const idx = imageNumber - 1; // Convert to 0-based
    // Column-first indexing: y-axis (rows) first, then x-axis (cols)
    const col = (idx / BLOCK_TILE_ROWS) | 0;
    const row = idx % BLOCK_TILE_ROWS;
    return row * BLOCK_TILE_COLS + col;
}

function stageFrame(imageNumber) {
    return (imageNumber || 0) + 1; // Math.max(0, (imageNumber || 1) - 1);
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
        this._enemies   = [];
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
        if (this._player)
            this.cameras.main.startFollow(this._player.sprite, true, 0.15, 0.15);

        this._cursors = this.input.keyboard.createCursorKeys();
        this._keyZ    = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
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
                row.push(gfx >= 0 ? blockTileFrame(gfx + 1) : 0);
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
        for (const si of (sd.items || [])) {
            const it = si.item;
            const e  = makeEntityAtTile(it.position_x, it.position_y, iw, ih, 0);
            e.sprite   = this.add.sprite(
                (e.xmin + e.xmax) * 0.5, (e.ymin + e.ymax) * 0.5,
                'item_tiles', itemTileFrame(it.image_number)
            ).setDepth(2);
            e.isPickup = true;
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
                e.hp = e.maxHp = ch.hp;
                e.sp = e.maxSp = ch.sp;
                // Player01.bmp faces left by default; flipX=true faces right.
                e.facingRight  = !!ch.facing_right;
                const cx       = (e.xmin + e.xmax) * 0.5;
                const cy       = (e.ymin + e.ymax) * 0.5;
                e.sprite       = this.add.sprite(cx, cy, 'player_stage', 0)
                    .setFlipX(!e.facingRight)
                    .setDepth(5);
                this._player   = e;
            } else if (!(ch.faction === 0 && ch.operation === 0)) {
                const cw  = fly ? (ec.flying_character_width  || 12) : (ec.walking_character_width  || 12);
                const ch2 = fly ? (ec.flying_character_height || 16) : (ec.walking_character_height || 24);
                const e   = makeEntityAtTile(ch.position_x, ch.position_y, cw, ch2, 1);
                e.isEnemy      = true;
                e.flying       = fly;
                e.hp = e.maxHp = ch.hp;
                const type     = Math.max(1, Math.min(8, ch.image_type || 1));
                const cx       = (e.xmin + e.xmax) * 0.5;
                const cy       = (e.ymin + e.ymax) * 0.5;
                e.sprite       = this.add.sprite(cx, cy, 'chara_' + type, stageFrame(ch.image_number)).setDepth(4);
                this._enemies.push(e);
            }
        }
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
        // Apply IDA Entity_OnLand snap formula exactly:
        // ymin -= (int(ymax) & 31) + 1
        // Result: ymax ends up approximately at tile_top - 1.
        const dy   = -(((e.ymax | 0) & 31) + 1);
        e.translateY(dy);
        e.velY     = 0;
        e.onGround = true;
        e.airTime  = 0;
        e.contactB = true;
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

    _syncSprite(e) {
        if (!e.sprite) return;
        e.sprite.setPosition((e.xmin + e.xmax) * 0.5, (e.ymin + e.ymax) * 0.5);
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
        if (Phaser.Input.Keyboard.JustDown(this._keyZ) && e.airTime < COYOTE) {
            e.jump();
            e.airTime  = COYOTE; // block double-jump until landing resets airTime
        }
    }

    //-----------------------------------------------------------------------

    update(time, delta) {
        this._accum += delta / 1000;
        let steps    = 0;
        while (this._accum >= FIXED_DT && steps < 5) {
            if (this._player) this._handleInput(this._player);

            for (let substep = 0; substep < PHYSICS_SUBSTEPS; substep++) {
                if (this._player) this._stepEntity(this._player);
                for (const e of this._enemies) {
                    if (e.active) this._stepEntity(e);
                }
            }

            this._accum -= FIXED_DT;
            steps++;
        }

        if (this._player) this._syncSprite(this._player);
        for (const e of this._enemies) this._syncSprite(e);
        for (const e of this._pickups)  this._syncSprite(e);

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
