// scenes/Scene_Boot.js
import { Scene_Base } from "./Scene_Base.js";
import { Scene_WorldMap } from "./Scene_WorldMap.js";
import { DataManager } from "../managers/DataManager.js";
import { SceneManager } from "../managers/SceneManager.js";
import { ImageManager } from "../managers/ImageManager.js";
import { Graphics } from "../core/Graphics.js";

export function Scene_Boot() {
    this.initialize(...arguments);
}

Scene_Boot.prototype = Object.create(Scene_Base.prototype);
Scene_Boot.prototype.constructor = Scene_Boot;

Scene_Boot.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._dataLoaded = false;
};

Scene_Boot.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.loadGameData();
};

Scene_Boot.prototype.loadGameData = async function() {
    try {
        await DataManager.loadDatabases();
        // Once data is loaded, we can tell ImageManager what to preload
        this.preloadImages();
        this._dataLoaded = true;
    } catch (e) {
        console.error("Failed to load game data:", e);
    }
};

Scene_Boot.prototype.preloadImages = function() {
    // Example: Preload essential images based on loaded data
    ImageManager.loadWorldChip("WorldMapChip");
    ImageManager.loadWorldEvent("WorldEvent");
    // Add any other crucial images here, like Player01.bmp
    ImageManager.loadCharacter("Player01");
};

Scene_Boot.prototype.isReady = function() {
    // The scene is ready when data is loaded AND all preloaded images are ready
    if (this._dataLoaded && ImageManager.isReady()) {
        return true;
    }
    return false;
};

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    // Data is loaded, let's go to the world map!
    SceneManager.goto(Scene_WorldMap);
    this.updateDocumentTitle();
};

Scene_Boot.prototype.updateDocumentTitle = function() {
    document.title = window.$dataSystem?.gameTitle || "Aquedi4 Engine";
};