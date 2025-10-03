/**
 * The game object class for a map, which holds STG4 data.
 */
export function Game_Map() {
    this.initialize(...arguments);
}

Game_Map.prototype.initialize = function() {
    this._mapId = 0;
    this._events = [];
    this._displayX = 0;
    this._displayY = 0;
    this.tileWidth = 32;  // Default for WorldMap
    this.tileHeight = 32; // Default for WorldMap
};

// New method to set up with WorldMap data
Game_Map.prototype.setupWorldMap = function() {
    this._mapId = 0; // 0 can represent the world map
    this.tileWidth = 32;
    this.tileHeight = 32;
};

// New method for setting up a STG4 stage
Game_Map.prototype.setupStage = function(stageData) {
    this._mapId = stageData.stage_name; // Use stage name as ID
    this.tileWidth = 16;  // Stages use 16x16 tiles
    this.tileHeight = 16;
};

Game_Map.prototype.update = function(sceneActive) {
    // Future logic for scrolling etc. will go here.
};

Game_Map.prototype.scrollDown = function(distance) { this._displayY += distance; };
Game_Map.prototype.scrollLeft = function(distance) { this._displayX -= distance; };
Game_Map.prototype.scrollRight = function(distance) { this._displayX += distance; };
Game_Map.prototype.scrollUp = function(distance) { this._displayY -= distance; };


Game_Map.prototype.setDisplayPos = function(x, y) {
    this._displayX = x;
    this._displayY = y;
};

Game_Map.prototype.tileWidth = function() { return 16; };
Game_Map.prototype.tileHeight = function() { return 16; };

Game_Map.prototype.adjustX = function(x) {
    return x - this._displayX;
};

Game_Map.prototype.adjustY = function(y) {
    return y - this._displayY;
};