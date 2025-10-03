// scenes/Scene_Map.js
import { Scene_Base } from "./Scene_Base.js";
import { Spriteset_Map } from "../sprites/Spriteset_Map.js";
import { DataManager } from "../managers/DataManager.js";
import { Game_Player } from "../objects/Game_Player.js";
import { Game_Map } from "../objects/Game_Map.js";

export function Scene_Map() {
    this.initialize(...arguments);
}

Scene_Map.prototype = Object.create(Scene_Base.prototype);
Scene_Map.prototype.constructor = Scene_Map;

Scene_Map.prototype.prepare = function(stageFileName) {
    this._stageFileName = stageFileName;
};

Scene_Map.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    DataManager.loadStageData(this._stageFileName);
};

Scene_Map.prototype.isReady = function() {
    return !!window.$dataStage && Scene_Base.prototype.isReady.call(this);
};

Scene_Map.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.createDisplayObjects();
};

Scene_Map.prototype.createDisplayObjects = function() {
    window.$gameMap = new Game_Map();
    window.$gamePlayer = new Game_Player(); // Re-create player for the stage

    $gameMap.setup(this._stageFileName);
    $gamePlayer.locate(10, 8); // Should be read from stage data
    $gamePlayer.setImage("Player01", 0); // Should be read from stage data

    this._spriteset = new Spriteset_Map();
    this.addChild(this._spriteset);
};

Scene_Map.prototype.update = function() {
    $gamePlayer.update(this.isActive());
    $gameMap.update(this.isActive());
    Scene_Base.prototype.update.call(this);
};