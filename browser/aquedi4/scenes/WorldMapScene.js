// scenes/WorldMapScene.js
import { DataManager } from '../managers/DataManager.js';
import { createAquediMessageWindow } from '../ui/AquediGui.js';

const TILE = 32;
const VIEW_COLS = 20;
const VIEW_ROWS = 15;
const PLAYER_SCREEN_X = 288;
const PLAYER_SCREEN_Y = 224;
const PLAYER_FRAME_TOGGLE = 40;

const DIR_DOWN = 0;
const DIR_UP = 1;
const DIR_LEFT = 2;
const DIR_RIGHT = 3;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function worldMapTileFrame(graphic) {
    return Math.max(0, Number(graphic || 0)) + 1;
}

function accessoryFrame(direction, blinkFrame) {
    let baseX = 0;
    let baseY = 64;
    if (direction === DIR_UP) {
        baseX = 64;
        baseY = 64;
    } else if (direction === DIR_LEFT) {
        baseX = 64;
        baseY = 96;
    } else if (direction === DIR_RIGHT) {
        baseX = 0;
        baseY = 96;
    }
    if (blinkFrame) baseX += 32;
    return (baseY / TILE) * 4 + (baseX / TILE);
}

function normalizeStageFile(path) {
    if (!path) return '';
    return path.split(/[/\\]/).pop().replace(/\.stg4_\d+$/i, '.stg4_1020');
}

export default class WorldMapScene extends Phaser.Scene {
    constructor() {
        super('WorldMapScene');
    }

    create() {
        this._data = DataManager.$dataWorldMap.data;
        this._state = 'navigate';
        this._cursor = {
            x: this._data.init_x || 0,
            y: this._data.init_y || 0,
            screenX: PLAYER_SCREEN_X,
            screenY: PLAYER_SCREEN_Y
        };
        this._scroll = { x: 0, y: 0 };
        this._direction = DIR_DOWN;
        this._blinkCounter = 0;
        this._activeEvent = null;
        this._activePage = null;
        this._stageMenu = null;

        this._setupBackground();
        this._recomputeScroll();
        this._buildTilemap();
        this._buildEvents();
        this._buildPlayerCursor();
        this._syncViewport();

        this._keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            z: Phaser.Input.Keyboard.KeyCodes.Z,
            x: Phaser.Input.Keyboard.KeyCodes.X,
            s: Phaser.Input.Keyboard.KeyCodes.S
        });
    }

    update() {
        this._blinkCounter = (this._blinkCounter + 1) % (PLAYER_FRAME_TOGGLE * 2);
        this._playerCursor.setFrame(accessoryFrame(this._direction, this._blinkCounter >= PLAYER_FRAME_TOGGLE));

        if (this._state === 'stage-menu') {
            this._updateStageMenuInput();
            return;
        }

        this._updateNavigationInput();
    }

    _setupBackground() {
        const bgIndex = this._data.background_index;
        const bgColor = DataManager.$globalPalette?.[bgIndex];
        this.cameras.main.setBackgroundColor(bgColor ?? 0x000000);
        this.cameras.main.setBounds(0, 0, VIEW_COLS * TILE, VIEW_ROWS * TILE);
        this.cameras.main.roundPixels = true;
    }

    _buildTilemap() {
        const rows = [];
        for (let y = 0; y < this._data.height; y++) {
            const row = [];
            for (let x = 0; x < this._data.width; x++) {
                const tileId = this._tileIdAt(x, y);
                const chip = this._chipForTileId(tileId);
                row.push(chip ? worldMapTileFrame(chip.graphic) : 0);
            }
            rows.push(row);
        }

        this._map = this.make.tilemap({ data: rows, tileWidth: TILE, tileHeight: TILE });
        const tileset = this._map.addTilesetImage('worldmap_chip');
        this._layer = this._map.createLayer(0, tileset, 0, 0).setDepth(0);
    }

    _buildEvents() {
        this._eventSprites = [];
        const texture = this.textures.get('worldmap_event');
        if (!texture || texture.key === '__MISSING') return;

        for (const event of this._data.events || []) {
            const page = this._selectActivePage(event);
            if (!page) continue;
            const sprite = this.add.sprite(event.placement_x * TILE, event.placement_y * TILE, 'worldmap_event')
                .setOrigin(0, 0)
                .setDepth(2);
            const sourceX = this._isWorldCleared(page) ? TILE : 0;
            const sourceY = page.graphic * TILE;
            sprite.setFrame(new Phaser.Textures.Frame(
                sprite.texture,
                'world_event_' + event.header + '_' + event.placement_x + '_' + event.placement_y,
                0,
                sourceX,
                sourceY,
                TILE,
                TILE
            ));
            this._eventSprites.push({ event, page, sprite });
        }
    }

    _buildPlayerCursor() {
        this._playerCursor = this.add.sprite(PLAYER_SCREEN_X, PLAYER_SCREEN_Y, 'accessory32', accessoryFrame(this._direction, false))
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(4);
    }

    _updateNavigationInput() {
        let nx = this._cursor.x;
        let ny = this._cursor.y;
        let direction = null;

        if (Phaser.Input.Keyboard.JustDown(this._keys.left)) {
            nx--;
            direction = DIR_LEFT;
        } else if (Phaser.Input.Keyboard.JustDown(this._keys.right)) {
            nx++;
            direction = DIR_RIGHT;
        } else if (Phaser.Input.Keyboard.JustDown(this._keys.up)) {
            ny--;
            direction = DIR_UP;
        } else if (Phaser.Input.Keyboard.JustDown(this._keys.down)) {
            ny++;
            direction = DIR_DOWN;
        }

        if (direction !== null) {
            this._direction = direction;
            this._tryMoveCursor(nx, ny);
        }

        if (Phaser.Input.Keyboard.JustDown(this._keys.z)) {
            const active = this._eventAt(this._cursor.x, this._cursor.y);
            if (active?.page?.start_stage) this._openStageMenu(active.event, active.page);
        }

        if (Phaser.Input.Keyboard.JustDown(this._keys.s)) {
            this.scene.start('StageScene', { stageFile: 'StorySample01.stg4_1020' });
        }
    }

    _tryMoveCursor(x, y) {
        x = clamp(x, 0, this._data.width - 1);
        y = clamp(y, 0, this._data.height - 1);
        if (!this._canPass(x, y)) return;
        this._cursor.x = x;
        this._cursor.y = y;
        this._recomputeScroll();
        this._syncViewport();
    }

    _recomputeScroll() {
        this._scroll.x = clamp(this._cursor.x - 9, 0, Math.max(0, this._data.width - VIEW_COLS));
        this._scroll.y = clamp(this._cursor.y - 7, 0, Math.max(0, this._data.height - VIEW_ROWS));
    }

    _syncViewport() {
        this.cameras.main.scrollX = this._scroll.x * TILE;
        this.cameras.main.scrollY = this._scroll.y * TILE;
        this._playerCursor.setPosition(
            (this._cursor.x - this._scroll.x) * TILE,
            (this._cursor.y - this._scroll.y) * TILE
        );
    }

    _tileIdAt(x, y) {
        if (x < 0 || y < 0 || x >= this._data.width || y >= this._data.height) return 0;
        return this._data.tiles[y * this._data.width + x] || 0;
    }

    _chipForTileId(tileId) {
        return tileId > 0 ? this._data.tiles_types[tileId - 1] : null;
    }

    _canPass(x, y) {
        const event = this._eventAt(x, y);
        if (event?.page && event.page.event_type === 2) return false;
        const chip = this._chipForTileId(this._tileIdAt(x, y));
        return !!chip && !chip.locked;
    }

    _eventAt(x, y) {
        for (const event of this._data.events || []) {
            if (event.placement_x !== x || event.placement_y !== y) continue;
            const page = this._selectActivePage(event);
            if (page) return { event, page };
        }
        return null;
    }

    _selectActivePage(event) {
        for (const page of event.pages || []) {
            if (this._pageConditionsMet(page)) return page;
        }
        return null;
    }

    _pageConditionsMet(page) {
        if (!page) return false;
        if (page.appearance_condition_world > 0 && !this._isWorldCleared({ world_number: page.appearance_condition_world })) {
            return false;
        }
        return true;
    }

    _isWorldCleared(page) {
        return !!this._clearedWorlds?.[page.world_number];
    }

    _openStageMenu(event, page) {
        this._activeEvent = event;
        this._activePage = page;
        this._state = 'stage-menu';
        this._stageMenu = {
            index: 1,
            stageFile: normalizeStageFile(page.start_stage),
            worldName: page.world_name || event.name || '',
            window: null
        };
        this._redrawStageMenu();
    }

    _updateStageMenuInput() {
        if (Phaser.Input.Keyboard.JustDown(this._keys.up) || Phaser.Input.Keyboard.JustDown(this._keys.down)) {
            this._stageMenu.index = this._stageMenu.index ? 0 : 1;
            this._redrawStageMenu();
        }

        if (Phaser.Input.Keyboard.JustDown(this._keys.x)) {
            this._closeStageMenu();
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this._keys.z)) {
            if (this._stageMenu.index === 0) {
                const stageFile = this._stageMenu.stageFile;
                this._closeStageMenu();
                this.scene.start('StageScene', { stageFile });
            } else {
                this._closeStageMenu();
            }
        }
    }

    _redrawStageMenu() {
        this._stageMenu.window?.destroy();
        const marker0 = this._stageMenu.index === 0 ? '▶' : '　';
        const marker1 = this._stageMenu.index === 1 ? '▶' : '　';
        const title = this._stageMenu.worldName;
        const message = title + '\n' + marker0 + 'ステージに挑戦\n' + marker1 + 'やっぱりやめる';
        this._stageMenu.window = createAquediMessageWindow(this, message, 304, 184, {
            origin: { x: 0.5, y: 0 },
            maxTextWidth: 0,
            scrollFactor: 0,
            depth: 50
        });
    }

    _closeStageMenu() {
        this._stageMenu?.window?.destroy();
        this._stageMenu = null;
        this._activeEvent = null;
        this._activePage = null;
        this._state = 'navigate';
    }
}
