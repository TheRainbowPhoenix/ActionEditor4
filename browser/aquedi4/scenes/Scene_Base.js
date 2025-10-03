import { Stage } from '../core/Stage'

/**
 * The superclass of all scenes.
 */
export function Scene_Base() {
    this.initialize(...arguments);
}

Scene_Base.prototype = Object.create(Stage.prototype);
Scene_Base.prototype.constructor = Scene_Base;

Scene_Base.prototype.initialize = function() {
    Stage.prototype.initialize.call(this);
    this._started = false;
    this._active = false;
};

Scene_Base.prototype.create = function() {};
Scene_Base.prototype.isReady = function() { return true; };
Scene_Base.prototype.start = function() { this._started = true; this._active = true; };
Scene_Base.prototype.update = function() { this.updateChildren(); };
Scene_Base.prototype.stop = function() { this._active = false; };
Scene_Base.prototype.isStarted = function() { return this._started; };
Scene_Base.prototype.isBusy = function() { return false; };
Scene_Base.prototype.terminate = function() {};

Scene_Base.prototype.updateChildren = function() {
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};