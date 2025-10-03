// scenes/Scene_WorldMap.js
import { Scene_Base } from "./Scene_Base.js";
import { Scene_Map } from "./Scene_Map.js";
import { SceneManager } from "../managers/SceneManager.js";
import { Game_Map } from "../objects/Game_Map.js";
import { Game_Player } from "../objects/Game_Player.js";
import { Spriteset_World } from "../sprites/Spriteset_World.js";
import { Input } from "../core/Input.js";

export function Scene_WorldMap() {
    this.initialize(...arguments);
}

Scene_WorldMap.prototype = Object.create(Scene_Base.prototype);
Scene_WorldMap.prototype.constructor = Scene_WorldMap;

Scene_WorldMap.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._mapLoaded = false;
};

// Phase 1: Create the scene. This happens immediately.
Scene_WorldMap.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    // In our engine, data is loaded in Scene_Boot, so we can
    // consider the map data "loaded" when this scene is created.
    this.onMapLoaded();
};

// Phase 2: Check if all assets are ready (images, etc.).
Scene_WorldMap.prototype.isReady = function() {
    // We wait for the Scene_Base to be ready (which checks ImageManager).
    // And ensure our game objects have been created.
    return this._mapLoaded && Scene_Base.prototype.isReady.call(this);
};

// This is called by `create` because data is already loaded from Scene_Boot.
Scene_WorldMap.prototype.onMapLoaded = function() {
    this.createDisplayObjects();
    this._mapLoaded = true;
};

// Phase 3: Called only when isReady() is true. Start scene activity.
Scene_WorldMap.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    // You could play BGM here
};

Scene_WorldMap.prototype.createDisplayObjects = function() {
    // Create the global game objects. These hold data, not visuals.
    window.$gameMap = new Game_Map(); // Represents the current map (world or stage)
    window.$gamePlayer = new Game_Player();

    // Use the loaded $dataWorldMap to set up the game objects.
    $gameMap.setupWorldMap();
    // $gamePlayer.locate($dataWorldMap.data.init_x, $dataWorldMap.data.init_y);
    // $gamePlayer.setImage("Player01", 0);

    // Create the spriteset, which will handle all visuals
    this._spriteset = new Spriteset_World();
    this.addChild(this._spriteset);
};

Scene_WorldMap.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    // Update data objects first
    $gameMap.update(this.isActive());
    $gamePlayer.update(this.isActive());

    this.checkEventTrigger();
};

Scene_WorldMap.prototype.checkEventTrigger = function() {
    if (Input.isPressed("ok")) {
        const x = Math.round($gamePlayer.x);
        const y = Math.round($gamePlayer.y);
        for (const event of $dataWorldMap.data.events) {
            if (event.placement_x === x && event.placement_y === y) {
                const page = event.pages[0];
                if (page && page.start_stage) {
                    SceneManager.prepareNextScene(page.start_stage);
                    SceneManager.goto(Scene_Map);
                }
            }
        }
    }
};