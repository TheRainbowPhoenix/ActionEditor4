import { Graphics } from "./Graphics.js";

/**
 * A simplified tilemap for displaying a grid of tiles.
 */
export function Tilemap() {
    this.initialize(...arguments);
}

Tilemap.prototype = Object.create(PIXI.Container.prototype);
Tilemap.prototype.constructor = Tilemap;

Tilemap.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._mapWidth = 0;
    this._mapHeight = 0;
    this._mapData = null;
    this._tilesetBitmap = null;
    
    // Properties for scrolling and culling
    this.origin = new PIXI.Point();
    this.tileWidth = 32;
    this.tileHeight = 32;

    this._needsRefresh = true;
    this._lastStartX = -1;
    this._lastStartY = -1;
};


/**
 * Sets the data for the tilemap.
 * @param {number} width - The width of the map in tiles.
 * @param {number} height - The height of the map in tiles.
 * @param {Array<number>} data - The tile data array.
 */
Tilemap.prototype.setData = function(width, height, data) {
    this._mapWidth = width;
    this._mapHeight = height;
    this._mapData = data;
};

/**
 * Sets the bitmap to use as the tileset.
 * @param {Bitmap} bitmap - The tileset image.
 */
Tilemap.prototype.setTileset = function(bitmap) {
    if (this._tilesetBitmap !== bitmap) {
        this._tilesetBitmap = bitmap;
        // if (this._tilesetBitmap) {
        //     this._tilesetBitmap.addLoadListener(() => this.refresh());
        // }
    }
};

/**
 * This is the core rendering method, called every frame by PIXI.
 */
Tilemap.prototype.updateTransform = function() {
    if (this._tilesetBitmap && this._tilesetBitmap.isReady()) {
        const ox = Math.floor(this.origin.x);
        const oy = Math.floor(this.origin.y);
        
        // Calculate which tile is at the top-left of the screen
        const startX = Math.floor(ox / this.tileWidth);
        const startY = Math.floor(oy / this.tileHeight);
        
        // If the viewport has scrolled to a new tile, we need to redraw
        if (this._lastStartX !== startX || this._lastStartY !== startY || this._needsRefresh) {
            this._refreshTiles(startX, startY);
            this._lastStartX = startX;
            this._lastStartY = startY;
            this._needsRefresh = false;
        }
    }
    
    // This part scrolls the container of sprites smoothly
    this.x = -this.origin.x;
    this.y = -this.origin.y;

    PIXI.Container.prototype.updateTransform.call(this);
};


/**
 * Redraws only the visible tiles.
 * @param {number} startX - The top-left tile X coordinate.
 * @param {number} startY - The top-left tile Y coordinate.
 */
Tilemap.prototype._refreshTiles = function(startX, startY) {
    this.removeChildren(); // Clear old tiles before redrawing
    
    const tileset = this._tilesetBitmap;
    const tilesPerRow = Math.floor(tileset.width / this.tileWidth);
    
    const numTilesX = Math.ceil(Graphics.width / this.tileWidth) + 1;
    const numTilesY = Math.ceil(Graphics.height / this.tileHeight) + 1;

    for (let y = 0; y < numTilesY; y++) {
        for (let x = 0; x < numTilesX; x++) {
            const mapX = startX + x;
            const mapY = startY + y;
            
            if (mapX >= 0 && mapX < this._mapWidth && mapY >= 0 && mapY < this._mapHeight) {
                const tileId = this._mapData[mapY * this._mapWidth + mapX];
                if (tileId > 0) {
                    const chip = $dataWorldMap.data.tiles_types[tileId - 1];
                    if (!chip) continue;

                    const tileSheetX = chip.graphic % tilesPerRow;
                    const tileSheetY = Math.floor(chip.graphic / tilesPerRow);
                    
                    const frame = new PIXI.Rectangle(
                        tileSheetX * this.tileWidth, tileSheetY * this.tileHeight,
                        this.tileWidth, this.tileHeight
                    );
                    const texture = new PIXI.Texture(tileset.baseTexture, frame);
                    
                    const sprite = new PIXI.Sprite(texture);
                    sprite.x = mapX * this.tileWidth;
                    sprite.y = mapY * this.tileHeight;
                    this.addChild(sprite);
                }
            }
        }
    }
};

/**
 * Redraws the entire tilemap. Should be called after setting data and tileset.
 */
Tilemap.prototype.refresh = function() {
    if (!this._tilesetBitmap || !this._tilesetBitmap.isReady()) {
        return; // Wait until the tileset is loaded
    }

    this.removeChildren(); // Clear old tiles

    const tilesPerRow = Math.floor(this._tilesetBitmap.width / this.tileWidth);

    for (let y = 0; y < this._mapHeight; y++) {
        for (let x = 0; x < this._mapWidth; x++) {
            const tileId = this._mapData[y * this._mapWidth + x];
            if (tileId > 0) {
                // In WorldMap.dat, tileId 1 refers to tiles_types[0]
                const chip = $dataWorldMap.data.tiles_types[tileId - 1];
                if (!chip) continue;

                const tileX = chip.graphic % tilesPerRow;
                const tileY = Math.floor(chip.graphic / tilesPerRow);

                const sourceX = tileX * this.tileWidth;
                const sourceY = tileY * this.tileHeight;

                const frame = new PIXI.Rectangle(sourceX, sourceY, this.tileWidth, this.tileHeight);
                const texture = new PIXI.Texture(this._tilesetBitmap.baseTexture, frame);
                
                const sprite = new PIXI.Sprite(texture);
                sprite.x = x * this.tileWidth;
                sprite.y = y * this.tileHeight;
                this.addChild(sprite);
            }
        }
    }
};