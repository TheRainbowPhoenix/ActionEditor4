// scenes/Scene_WorldMap.js
import { Scene_Base } from "./Scene_Base.js";
import { Scene_Map } from "./Scene_Map.js";
import { SceneManager } from "../managers/SceneManager.js";
import { Game_Player } from "../objects/Game_Player.js";
import { Spriteset_World } from "../sprites/Spriteset_World.js";
import { Input } from "../core/Input.js";

export function Scene_WorldMap() {
    this.initialize(...arguments);
}

Scene_WorldMap.prototype = Object.create(Scene_Base.prototype);
Scene_WorldMap.prototype.constructor = Scene_WorldMap;

Scene_WorldMap.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createDisplayObjects();
};

Scene_WorldMap.prototype.createDisplayObjects = function() {
    // These should be global for easy access
    window.$gamePlayer = new Game_Player();

    // Set player start position from WorldMap.dat
    // $gamePlayer.locate($dataWorldMap.data.init_x, $dataWorldMap.data.init_y);
    // $gamePlayer.setImage("Player01", 0); // Example graphic

    this._spriteset = new Spriteset_World();
    this.addChild(this._spriteset);
};

Scene_WorldMap.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    $gamePlayer.update(this.isActive());
    this.checkEventTrigger();
};

Scene_WorldMap.prototype.checkEventTrigger = function() {
    if (Input.isPressed("ok")) {
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        for (const event of $dataWorldMap.data.events) {
            if (event.placement_x === x && event.placement_y === y) {
                const page = event.pages[0]; // Assuming first page for simplicity
                if (page.start_stage) {
                    SceneManager.prepareNextScene(page.start_stage);
                    SceneManager.goto(Scene_Map);
                }
            }
        }
    }
};