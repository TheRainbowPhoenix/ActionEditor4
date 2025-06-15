import { parseStage } from '../data/DataParser.js';
import DataReader from '../data/DataReader.js';
import Player from '../game-objects/Player.js';
import Character from '../game-objects/Character.js';

export default class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    create() {
        // 1. Parse Data
        const stageBinary = this.cache.binary.get('stage_data');
        const dataReader = new DataReader(stageBinary.buffer);
        this.stageData = parseStage(dataReader); // Assuming a parseStage function exists

        // 2. Set up World
        this.physics.world.setBounds(0, 0, this.stageData.horizontal_width * 32, this.stageData.vertical_width * 32);
        this.physics.world.gravity.y = this.stageData.gravity * 60; // Adjust multiplier as needed

        // 3. Create Game Objects
        const blocks = this.physics.add.staticGroup();
        this.stageData.block_data.forEach(blockData => {
            if (blockData.block_type === 1) { // Only solid blocks
                blocks.create(blockData.position_x * 32 + 16, blockData.position_y * 32 + 16, 'block_spritesheet', blockData.image_number);
            }
        });

        this.enemies = this.add.group();
        this.stageData.character_data.forEach(charData => {
            if (charData.operation === 0) { // Player
                this.player = new Player(this, charData.position_x * 32 + 16, charData.position_y * 32 + 16, 'player_spritesheet', charData);
            } else { // Enemy
                const enemy = new Character(this, charData.position_x * 32 + 16, charData.position_y * 32 + 16, 'enemy_spritesheet', charData);
                this.enemies.add(enemy);
            }
        });

        // 4. Setup Collisions
        this.physics.add.collider(this.player, blocks);
        this.physics.add.collider(this.enemies, blocks);
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
    }

    update(time, delta) {
        this.player.update(time, delta);
        this.enemies.getChildren().forEach(enemy => enemy.update(time, delta));
    }

    handlePlayerEnemyCollision(player, enemy) {
        // Handle damage logic here
        console.log('Player touched enemy!');
    }
}