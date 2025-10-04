// objects/Player.js

import { DataManager } from '../managers/DataManager.js';

/**
 * @typedef {import('../scenes/WorldMapScene.js').default} WorldMapScene
 */


export default class Player extends Phaser.GameObjects.Sprite {
    /**
     * @param {WorldMapScene} scene The Scene to which this Game Object belongs.
     * @param {number} x The horizontal position of this Game Object in the world.
     * @param {number} y The vertical position of this Game Object in the world.
     * @param {string} textureKey The key of the Texture this Game Object will use to render with.
     */
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        this.scene = scene;
        
        // --- Movement Properties ---
        this.isMoving = false;
        this.tileX = Math.floor(x / this.scene.map.tileWidth);
        this.tileY = Math.floor(y / this.scene.map.tileHeight);
        
        this.anims.play('idle_up');
        this.direction = 'down';
        
        /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.isMoving) {
            return; // Don't allow new input while moving
        }
        
        let targetX = this.tileX;
        let targetY = this.tileY;
        let newDirection = null;

        if (this.cursors.left.isDown) {
            targetX -= 1;
            newDirection = 'left';
        } else if (this.cursors.right.isDown) {
            targetX += 1;
            newDirection = 'right';
        } else if (this.cursors.up.isDown) {
            targetY -= 1;
            newDirection = 'up';
        } else if (this.cursors.down.isDown) {
            targetY += 1;
            newDirection = 'down';
        }

        if (newDirection) {
            this.direction = newDirection;
            if (this.canPass(targetX, targetY)) {
                this.moveCharacterTo(targetX, targetY);
            } else {
                // Optional: Play a bump sound or animation if movement is blocked
                this.anims.play('idle_' + this.direction, true); // Stay idle but face the direction
            }
        } else {
            // Not moving, play idle animation
            this.anims.play('idle_' + this.direction, true);
        }
    }

    /**
     * Checks if a target tile is passable.
     * @param {number} x The target tile X coordinate.
     * @param {number} y The target tile Y coordinate.
     * @returns {boolean}
     */
    canPass(x, y) {
        const mapData = DataManager.$dataWorldMap.data;
        const mapWidth = mapData.width;
        
        // Check map boundaries
        if (x < 0 || x >= mapData.width || y < 0 || y >= mapData.height) {
            return false;
        }
        
        // Check tile ID from the processed tiles array
        const tileId = mapData.tiles[y * mapWidth + x];
        
        // A tileId of 0 means the tile is empty and impassable
        return tileId !== 0;
    }

    moveCharacterTo(targetX, targetY) {
        this.isMoving = true;
        this.tileX = targetX;
        this.tileY = targetY;

        this.anims.play('walk_' + this.direction, true);

        this.scene.tweens.add({
            targets: this,
            x: (targetX + 0.5) * this.scene.map.tileWidth,
            y: (targetY + 0.5) * this.scene.map.tileHeight,
            duration: 200, // Speed of the tile movement
            ease: 'Linear',
            onComplete: () => {
                this.isMoving = false;
            }
        });
    }
}