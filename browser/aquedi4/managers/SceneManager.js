import { Graphics } from "../core/Graphics.js";

/**
 * The static class that manages scene transitions.
 */
export function SceneManager() {
    throw new Error("This is a static class");
}

SceneManager._scene = null;
SceneManager._nextScene = null;
SceneManager._stack = [];

SceneManager.run = function(sceneClass) {
    try {
        this.initialize();
        this.goto(sceneClass);
        Graphics.startGameLoop();
        // Graphics.setTickHandler(this.update.bind(this));
    } catch (e) {
        // this.catchException(e);
        console.error(e);
    }
};


SceneManager.initialize = function() {
    this.checkBrowser();
    // this.checkPluginErrors();
    this.initGraphics();
    // this.initAudio();
    // this.initVideo();
    // this.initInput();
    // this.setupEventHandlers();
};

SceneManager.checkBrowser = function() {
    // if (!Utils.canUseWebGL()) {
    //     throw new Error("Your browser does not support WebGL.");
    // }
}

SceneManager.initGraphics = function() {
    if (!Graphics.initialize(640, 480)) {
        throw new Error("Failed to initialize graphics.");
    }
    Graphics.setTickHandler(this.update.bind(this));
};

SceneManager.update = function(deltaTime) {
    try {
        // const n = this.determineRepeatNumber(deltaTime);
        this.updateMain(deltaTime);
    } catch (e) {
        // this.catchException(e);
        console.error(e);
    }
};

SceneManager.updateMain = function(deltaTime) {
    // this.updateFrameCount();
    // this.updateInputData();
    // this.updateEffekseer();
    this.changeScene();
    this.updateScene(deltaTime);
};

SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        if (this._scene) {
            this._scene.terminate();
            this.onSceneTerminate();
        }
        this._scene = this._nextScene;
        this._nextScene = null;
        if (this._scene) {
            this._scene.create();
            this.onSceneCreate();
        }
        if (this._exiting) {
            this.terminate();
        }
    }
};

SceneManager.updateScene = function(deltaTime) {
    if (this._scene) {
        if (this._scene.isStarted()) {
            this._scene.update(deltaTime);
        } else if (this._scene.isReady()) {
            this._scene.start();
        }
    }
};

SceneManager.isSceneChanging = function() {
    return !!this._nextScene;
};

SceneManager.isCurrentSceneBusy = function() {
    return this._scene ? this._scene.isBusy() : false;
};

SceneManager.goto = function(sceneClass) {
    if (sceneClass) {
        this._nextScene = new sceneClass();
    }
    if (this._scene) {
        this._scene.stop();
    }
};

SceneManager.onSceneCreate = function() {
    Graphics.startLoading();
};

SceneManager.onSceneTerminate = function() {
    this._previousScene = this._scene;
    this._previousClass = this._scene.constructor;
    Graphics.setStage(null);
};