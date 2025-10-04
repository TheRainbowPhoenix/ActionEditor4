// scenes/StageScene.js
import { DataManager } from '../managers/DataManager.js';
import Player from '../objects/Player.js';

export default class StageScene extends Phaser.Scene {
    constructor() {
        super('StageScene');
    }

    init(data) {
        // Receive the stage file name from the previous scene
        this.stageFile = data.stageFile || 'Default.stg4_1020';
        this.stageKey = 'stageData_' + this.stageFile;
    }

    preload() {
        // Load the specific stage file
        this.load.stg4(this.stageKey, 'data/stg4/' + this.stageFile);

        // We would also load stage-specific assets here if needed
        // For example, based on the content of PrjOption.dat or System.dat
        this.load.bmp('player', 'bmp/chara_sp/Player01.bmp');
        this.load.bmp('block_tileset', 'bmp/Block.bmp'); // Example block tileset
    }

    create() {
        // Retrieve the parsed stage data from Phaser's cache
        const stageData = this.cache.custom.get(this.stageKey);
        if (!stageData) {
            console.error(`Failed to load stage data for: ${this.stageFile}`);
            // Optionally, return to the world map
            // this.scene.start('WorldMapScene');
            return;
        }

        DataManager.$dataStage = stageData;
        console.log("Stage data is ready:", stageData);

        // --- Render the Stage ---

        // Render Blocks
        const blockTileset = this.textures.get('block_tileset');
        if (blockTileset && stageData.blocks) {
            for (const stageBlock of stageData.blocks) {
                const blockData = stageBlock.block;
                
                // Assuming Block.bmp is a spritesheet and image_number is the frame index
                const frameIndex = blockData.image_number || 0;
                
                // Assuming 16x16 tiles in Block.bmp
                const tileWidth = 16;
                const tileHeight = 16;

                this.add.image(blockData.position_x, blockData.position_y, 'block_tileset', frameIndex)
                    .setOrigin(0, 0); // Align to top-left
            }
        }
        
        // Add player to the scene
        // We'll place the player at a default position for now
        this.player = new Player(this, 100, 450, 'player');
        this.add.existing(this.player);

        // Setup camera to follow the player within the stage bounds
        this.cameras.main.startFollow(this.player, true);
        
        // You would get the stage bounds from the STG4 data, e.g., stageData.x_coordinate_upper_limit
        // For now, let's set a large boundary
        const stageWidth = stageData.x_coordinate_upper_limit || 2000;
        const stageHeight = stageData.y_coordinate_upper_limit || 600;
        this.cameras.main.setBounds(0, 0, stageWidth, stageHeight);
        this.physics.world.setBounds(0, 0, stageWidth, stageHeight);
    }

    update(time, delta) {
        if (this.player) {
            this.player.update(delta);
        }
    }
}