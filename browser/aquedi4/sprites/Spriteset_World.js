// sprites/Spriteset_World.js
import { Sprite } from "../core/Sprite.js";
import { Sprite_Character } from "./Sprite_Character.js";
import { ImageManager } from "../managers/ImageManager.js";

export function Spriteset_World() {
    this.initialize(...arguments);
}

Spriteset_World.prototype = Object.create(PIXI.Container.prototype);
Spriteset_World.prototype.constructor = Spriteset_World;

Spriteset_World.prototype.initialize = function() {
    PIXI.Container.call(this);
    this.createBaseSprite();
    this.createTilemap();
    this.createCharacters();
};

Spriteset_World.prototype.createBaseSprite = function() {
    this._baseSprite = new PIXI.Container();
    this.addChild(this._baseSprite);
};

Spriteset_World.prototype.createTilemap = function() {
    this._tilemap = new PIXI.Container();
    this._baseSprite.addChild(this._tilemap);

    const mapData = $dataWorldMap.data;
    const tileWidth = 32; // Assuming 32x32 world tiles
    const tileHeight = 32;

    const chipBitmap = ImageManager.loadWorldChip("WorldMapChip");
    chipBitmap.addLoadListener(() => {
        for (let y = 0; y < mapData.height; y++) {
            for (let x = 0; x < mapData.width; x++) {
                const tileId = mapData.tiles[y * mapData.width + x];
                if (tileId > 0) {
                    const chip = mapData.tiles_types[tileId - 1];
                    const sprite = new PIXI.Sprite();
                    sprite.texture = new PIXI.Texture(
                        chipBitmap.baseTexture,
                        new PIXI.Rectangle(chip.graphic * tileWidth, 0, tileWidth, tileHeight)
                    );
                    sprite.x = x * tileWidth;
                    sprite.y = y * tileHeight;
                    this._tilemap.addChild(sprite);
                }
            }
        }
    });
};

Spriteset_World.prototype.createCharacters = function() {
    this._characterSprites = [];
    this._characterSprites.push(new Sprite_Character(window.$gamePlayer));
    
    // Add event sprites
    const eventBitmap = ImageManager.loadWorldEvent("WorldEvent");
    eventBitmap.addLoadListener(() => {
        for(const event of $dataWorldMap.data.events) {
            const sprite = new PIXI.Sprite(new PIXI.Texture(
                eventBitmap.baseTexture,
                new PIXI.Rectangle(event.pages[0].graphic * 32, 0, 32, 32)
            ));
            sprite.anchor.set(0.5, 1);
            sprite.x = (event.placement_x + 0.5) * 32;
            sprite.y = (event.placement_y + 1) * 32;
            this._tilemap.addChild(sprite);
        }
    });

    for (const sprite of this._characterSprites) {
        this._tilemap.addChild(sprite);
    }
};

Spriteset_World.prototype.update = function() {
    // Simple scrolling: center the player
    this.x = Graphics.width / 2 - $gamePlayer._realX * 32;
    this.y = Graphics.height / 2 - $gamePlayer._realY * 32;

    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};