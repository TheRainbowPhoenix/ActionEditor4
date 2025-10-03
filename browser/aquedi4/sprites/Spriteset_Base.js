// sprites/Spriteset_Base.js
import { Sprite } from "../core/Sprite.js";
import { ScreenSprite } from "../core/ScreenSprite.js";
import { Graphics } from "../core/Graphics.js";

/**
 * The superclass of all spritesets.
 */
export function Spriteset_Base() {
    this.initialize(...arguments);
}

Spriteset_Base.prototype = Object.create(Sprite.prototype);
Spriteset_Base.prototype.constructor = Spriteset_Base;

Spriteset_Base.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.setFrame(0, 0, Graphics.width, Graphics.height);
    this.createLowerLayer();
    this.createUpperLayer();
};

Spriteset_Base.prototype.createLowerLayer = function() {
    this.createBaseSprite();
};

Spriteset_Base.prototype.createUpperLayer = function() {
    // We can add pictures, timers etc. here later
};

Spriteset_Base.prototype.createBaseSprite = function() {
    // This container will hold the tilemap and characters, and will be scrolled.
    this._baseSprite = new Sprite();
    this._blackScreen = new ScreenSprite();
    this._blackScreen.opacity = 255;
    
    // IMPORTANT HIERARCHY:
    // this (Spriteset_Base) -> _baseSprite -> _blackScreen
    this.addChild(this._baseSprite);
    this._baseSprite.addChild(this._blackScreen);
};

// This is the core update loop for the spriteset.
Spriteset_Base.prototype.update = function() {
    Sprite.prototype.update.call(this);
};