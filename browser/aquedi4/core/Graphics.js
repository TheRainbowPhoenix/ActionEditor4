import { SceneManager } from "../managers/SceneManager.js";

/**
 * The static class that carries out graphics processing.
 */
export function Graphics() {
    throw new Error("This is a static class");
}

Graphics.initialize = function(width, height) {
    this._width = width;
    this._height = height;
    this._tickHandler = null;
    this._app = null;
    this.frameCount = 0;
    
    this._createPixiApp();
    this._createAllElements();
    
    document.body.appendChild(this._app.view);
    
    // Fit canvas to window
    const resize = () => {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const scale = Math.min(screenWidth / this._width, screenHeight / this._height);
        this._app.view.style.width = `${this._width * scale}px`;
        this._app.view.style.height = `${this._height * scale}px`;
    };
    window.addEventListener('resize', resize);
    resize();

    return !!this._app;
};

Object.defineProperty(Graphics, "app", {
    get: function() { return this._app; },
    configurable: true
});

Object.defineProperty(Graphics, "width", {
    get: function() { return this._width; },
    configurable: true
});

Object.defineProperty(Graphics, "height", {
    get: function() { return this._height; },
    configurable: true
});

Graphics.setTickHandler = function(handler) {
    this._tickHandler = handler;
};

Graphics.startGameLoop = function() {
    this._app.start();
};

Graphics.setStage = function(stage) {
    this._app.stage = stage;
};

Graphics._createPixiApp = function() {
    this._app = new PIXI.Application({
        width: this._width,
        height: this._height,
        backgroundColor: 0x000000,
        autoStart: false
    });
    this._app.ticker.remove(this._app.render, this._app);
    this._app.ticker.add(this._onTick, this);
};

Graphics._onTick = function(deltaTime) {
    // this._fpsCounter.startTick();
    this.frameCount++;
    if (this._tickHandler) {
        this._tickHandler(deltaTime);
    }
    if (this._app.stage) {
        this._app.render();
    }
    // this._fpsCounter.endTick();
};

Graphics._createAllElements = function() {
    // this._createErrorPrinter();
    // this._createCanvas();
    this._createLoadingSpinner();
    // this._createFPSCounter();
};

Graphics._updateAllElements = function() {
    // this._updateRealScale();
    // this._updateErrorPrinter();
    // this._updateCanvas();
    // this._updateVideo();
};

Graphics._createLoadingSpinner = function() {
    const loadingSpinner = document.createElement("div");
    const loadingSpinnerImage = document.createElement("div");
    loadingSpinner.id = "loadingSpinner";
    loadingSpinnerImage.id = "loadingSpinnerImage";
    loadingSpinner.appendChild(loadingSpinnerImage);
    this._loadingSpinner = loadingSpinner;
};

Graphics.startLoading = function() {
    if (!document.getElementById("loadingSpinner")) {
        document.body.appendChild(this._loadingSpinner);
    }
};

Graphics.endLoading = function() {
    if (document.getElementById("loadingSpinner")) {
        document.body.removeChild(this._loadingSpinner);
        return true;
    } else {
        return false;
    }
};