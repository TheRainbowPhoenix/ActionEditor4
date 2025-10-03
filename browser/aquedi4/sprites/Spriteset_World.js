// sprites/Spriteset_World.js
import { Spriteset_Base } from "./Spriteset_Base.js";
import { Tilemap } from "../core/Tilemap.js";
import { Sprite_Character } from "./Sprite_Character.js";
import { ImageManager } from "../managers/ImageManager.js";
import { Graphics } from "../core/Graphics.js";
import { Sprite } from "../core/Sprite.js";

export function Spriteset_World() {
    this.initialize(...arguments);
}

Spriteset_World.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_World.prototype.constructor = Spriteset_World;

Spriteset_World.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
    this.createLowerLayer();
};

// Overrides Spriteset_Base to add world-specific layers
Spriteset_World.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createBackground();
    this.createTilemap();
    this.createCharacters();
    this.createDebugShape(); 
};

Spriteset_World.prototype.createBackground = function() {
    const bgPath = $dataWorldMap.data.bg_path;
    if (bgPath) {
        const filename = bgPath.split('\\').pop().replace('.bmp', '');
        const folder = bgPath.includes('back') ? 'back/' : '';

        this._backgroundSprite = new Sprite(ImageManager.load(ImageManager._path + folder + filename + ".bmp"));
        this._baseSprite.addChild(this._backgroundSprite);
    }
};

Spriteset_World.prototype.createTilemap = function() {
    this._tilemap = new Tilemap();
    this._baseSprite.addChild(this._tilemap);

    const mapData = $dataWorldMap.data;
    const tilesetBitmap = ImageManager.loadWorldChip("WorldMapChip");
    
    this._tilemap.setTileset(tilesetBitmap);
    this._tilemap.setData(mapData.width, mapData.height, mapData.tiles);
};

Spriteset_World.prototype.createCharacters = function() {
    // Player sprite
    this._playerSprite = new Sprite_Character(window.$gamePlayer);
    
    // We add characters to the base sprite, not the tilemap,
    // so they can be scrolled independently if needed.
    this._baseSprite.addChild(this._playerSprite);

    const eventBitmap = ImageManager.loadWorldEvent("WorldEvent");
    this._eventSprites = [];
    
    eventBitmap.addLoadListener((loadedEventBitmap) => {
        const tileWidth = 32;
        const tileHeight = 32;
        const tilesPerRow = Math.floor(loadedEventBitmap.width / tileWidth);

        for (const event of $dataWorldMap.data.events) {
            const page = event.pages[0];
            if (!page) continue;

            // Calculate grid position in the event sheet
            const tileX = page.graphic % tilesPerRow;
            const tileY = Math.floor(page.graphic / tilesPerRow);
            
            const frame = new PIXI.Rectangle(tileX * tileWidth, tileY * tileHeight, tileWidth, tileHeight);
            const texture = new PIXI.Texture(loadedEventBitmap.baseTexture, frame);
            
            const sprite = new PIXI.Sprite(texture);
            sprite.anchor.set(0.5, 1);
            sprite.x = (event.placement_x + 0.5) * tileWidth;
            sprite.y = (event.placement_y + 1) * tileHeight;
            this._eventSprites.push(sprite);
            this._baseSprite.addChild(sprite); // Add to tilemap so it scrolls
        }
    });
    
    // Add player sprite last to be on top
    this._baseSprite.addChild(this._playerSprite);
};

Spriteset_World.prototype.createDebugShape = function() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF00FF); // Bright magenta
    graphics.drawRect(0, 0, 50, 50);
    graphics.endFill();
    graphics.x = 100;
    graphics.y = 100;
    // Add it to `this` so it's not affected by map scrolling
    this.addChild(graphics); 
};

Spriteset_World.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateScrollingAndTilemap();

    if (this._blackScreen && this._backgroundSprite && this._backgroundSprite._bitmap.isReady()) {
        this._blackScreen.opacity = 0;
    }
};

Spriteset_World.prototype.updateScrollingAndTilemap = function() {
    if (this._tilemap) {
        // Update the tilemap's origin based on player's position.
        // This tells the tilemap what part of the map to render.
        const ox = $gamePlayer._realX * this._tilemap.tileWidth - Graphics.width / 2;
        const oy = $gamePlayer._realY * this._tilemap.tileHeight - Graphics.height / 2;
        this._tilemap.origin.set(ox, oy);

        // Update positions of sprites relative to the map
        this.updateCharacterPositions();
    }
};

Spriteset_World.prototype.updateCharacterPositions = function() {
    // We scroll the entire world by moving the _baseSprite.
    // Individual character sprites update their own positions relative to the map.
    this.x = -this._tilemap.origin.x;
    this.y = -this._tilemap.origin.y;
};