// scenes/WorldMapScene.js
import { DataManager } from '../managers/DataManager.js';
import Player from '../objects/Player.js';

/** @typedef {import('phaser')} Phaser */

export default class WorldMapScene extends Phaser.Scene {
    constructor() {
        super('WorldMapScene');
    }

    create() {
        const mapData = DataManager.$dataWorldMap.data;
        const tileWidth = 32;
        const tileHeight = 32;

        this.createPlayerAnimations();

        // Pass `this.map` to the Player constructor for tile size info
        this.map = this.make.tilemap({
            data: this.createTilemapData(mapData),
            tileWidth: tileWidth,
            tileHeight: tileHeight
        });

        const tileset = this.map.addTilesetImage('worldmap_chip');
        const layer = this.map.createLayer(0, tileset, 0, 0);
        
        // Add Events as Sprites on top of the tilemap layer
        this.createEventSprites(mapData, tileWidth, tileHeight);

        // Use the 'player_world' texture from Accessory.bmp
        this.player = new Player(
            this,
            (mapData.init_x + 0.5) * tileWidth,
            (mapData.init_y + 0.5) * tileHeight,
            'player_world'
        );
        this.add.existing(this.player);

        // Camera setup
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.input.keyboard.on('keydown-Z', () => { this.checkEventTrigger(); });
    }

    createPlayerAnimations() {
        const frameRate = 6;
        const frameOffset = 8; // Start at frame 8

        // Down: frames 8, 9
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('player_world', { start: frameOffset + 0, end: frameOffset + 1 }),
            frameRate: frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_down',
            frames: [{ key: 'player_world', frame: frameOffset + 0 }],
        });

        // Up: frames 10, 11
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('player_world', { start: frameOffset + 2, end: frameOffset + 3 }),
            frameRate: frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_up',
            frames: [{ key: 'player_world', frame: frameOffset + 2 }],
        });

        // Right: frames 12, 13
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('player_world', { start: frameOffset + 4, end: frameOffset + 5 }),
            frameRate: frameRate,
            repeat: -1
        });
         this.anims.create({
            key: 'idle_right',
            frames: [{ key: 'player_world', frame: frameOffset + 4 }],
        });

        // Left: frames 14, 15
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('player_world', { start: frameOffset + 6, end: frameOffset + 7 }),
            frameRate: frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_left',
            frames: [{ key: 'player_world', frame: frameOffset + 6 }],
        });
    }

    update(time, delta) {
        this.player.update(delta);
    }

    createTilemapData(mapData) {
        const data = [];
        for (let y = 0; y < mapData.height; y++) {
            const row = [];
            for (let x = 0; x < mapData.width; x++) {
                const tileId = mapData.tiles[y * mapData.width + x];
                const chip = tileId > 0 ? mapData.tiles_types[tileId - 1] : null;
                // Phaser tile index is based on the graphic index from the tileset image
                row.push(chip ? chip.graphic + 1 : 0);
            }
            data.push(row);
        }
        return data;
    }

    /**
     * Creates sprites for the world map events with complex frame calculation.
     * @param {object} mapData The world map data.
     * @param {number} tileWidth The width of a tile.
     * @param {number} tileHeight The height of a tile.
     */
    createEventSprites(mapData, tileWidth, tileHeight) {
        const eventTexture = this.textures.get('worldmap_event');
        if (!eventTexture || eventTexture.key === '__MISSING') {
            console.warn("WorldEvent.bmp texture not found or not loaded.");
            return;
        }

        // Calculate how many columns are available in the spritesheet
        const tilesPerColumn = Math.floor(eventTexture.source[0].height / tileHeight);
        const maxColumnIndex = Math.floor(eventTexture.source[0].width / tileWidth) - 1;

        for (const event of mapData.events) {
            const page = event.pages[0];
            if (!page) continue;
            
            // Determine the column from world_number, clamping to the max available column
            const columnIndex = 1 - Math.min(page.world_number, maxColumnIndex);
            
            // The `graphic` value is the row index within that column
            const rowIndex = page.graphic;

            // Calculate the source pixel coordinates
            const sourceX = columnIndex * tileWidth;
            const sourceY = rowIndex * tileHeight;

            // Create the sprite from the spritesheet
            const eventSprite = this.add.sprite(
                (event.placement_x + 0.5) * tileWidth,
                (event.placement_y + 1) * tileHeight, // Anchor to bottom of tile
                'worldmap_event'
            ).setOrigin(0.5, 1);
            
            // Set the frame using the calculated pixel coordinates
            eventSprite.setFrame(new Phaser.Textures.Frame(
                eventSprite.texture,
                'event_' + event.header, // a unique name for the frame
                0, // source index
                sourceX, sourceY,
                tileWidth, tileHeight
            ));
        }
    }

    checkEventTrigger() {
        // Position in tiles
        const x = Math.floor(this.player.x / 32);
        const y = Math.floor(this.player.y / 32);

        for (const event of DataManager.$dataWorldMap.data.events) {
            if (event.placement_x === x && event.placement_y === y) {
                const page = event.pages[0];
                if (page && page.start_stage) {
                    console.log(`Transitioning to stage: ${page.start_stage}`);
                    
                    // Clean up the stage path
                    const stageFile = page.start_stage.split('\\').pop();
                    this.scene.start('StageScene', { stageFile: stageFile });
                }
            }
        }
    }
}