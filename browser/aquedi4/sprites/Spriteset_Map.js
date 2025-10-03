import { Sprite } from "../core/Sprite.js";
import { Sprite_Character } from "./Sprite_Character.js";
import { ImageManager } from "../managers/ImageManager.js";

/**
 * The set of sprites on the map screen.
 */
export function Spriteset_Map() {
    this.initialize(...arguments);
}

Spriteset_Map.prototype = Object.create(PIXI.Container.prototype);
Spriteset_Map.prototype.constructor = Spriteset_Map;

Spriteset_Map.prototype.initialize = function() {
    PIXI.Container.call(this);
    this.createLowerLayer();
    this.createCharacters();
};

Spriteset_Map.prototype.createLowerLayer = function() {
    this._baseSprite = new PIXI.Container();
    this.addChild(this._baseSprite);
    this.createBlocks();
};

Spriteset_Map.prototype.createBlocks = function() {
    this._blockSprites = [];
    if (window.$dataStage && window.$dataStage.blocks) {
        for (const stageBlock of $dataStage.blocks) {
            const blockData = stageBlock.block;
            // NOTE: This mapping is a guess. You'd need to know what image_type
            // and image_number correspond to.
            const filename = `block_${blockData.image_type}_${blockData.image_number}`;
            const bitmap = ImageManager.loadBitmap("img/blocks/", filename + ".bmp");
            const sprite = new Sprite(bitmap);
            sprite.x = blockData.position_x;
            sprite.y = blockData.position_y;
            this._blockSprites.push(sprite);
            this._baseSprite.addChild(sprite);
        }
    }
};

Spriteset_Map.prototype.createCharacters = function() {
    this._characterSprites = [];
    
    // Add player sprite
    this._characterSprites.push(new Sprite_Character(window.$gamePlayer));

    // Add other character/enemy sprites from stage data
    if (window.$dataStage && window.$dataStage.characters) {
         for (const stageChar of $dataStage.characters) {
            // Here you would create Game_Event or Game_Enemy objects
            // and then their corresponding sprites.
         }
    }

    for (const sprite of this._characterSprites) {
        this._baseSprite.addChild(sprite);
    }
};

Spriteset_Map.prototype.update = function() {
    this.x = -$gameMap._displayX * $gameMap.tileWidth();
    this.y = -$gameMap._displayY * $gameMap.tileHeight();
    
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};