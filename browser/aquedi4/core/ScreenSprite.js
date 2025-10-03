// core/ScreenSprite.js
import { Graphics } from "./Graphics.js";

/**
 * The sprite which covers the entire game screen.
 */
export function ScreenSprite() {
    this.initialize(...arguments);
}

ScreenSprite.prototype = Object.create(PIXI.Container.prototype);
ScreenSprite.prototype.constructor = ScreenSprite;

ScreenSprite.prototype.initialize = function() {
    PIXI.Container.call(this);
    this._graphics = new PIXI.Graphics();
    this.addChild(this._graphics);
    this._red = -1;
    this._green = -1;
    this._blue = -1;
    this.setColor(0, 0, 0); // Start black
};

Object.defineProperty(ScreenSprite.prototype, "opacity", {
    get: function() {
        return this.alpha * 255;
    },
    set: function(value) {
        this.alpha = Math.min(255, Math.max(0, value)) / 255;
    },
    configurable: true
});

ScreenSprite.prototype.setColor = function(r, g, b) {
    if (this._red !== r || this._green !== g || this._blue !== b) {
        r = Math.round(r || 0);
        g = Math.round(g || 0);
        b = Math.round(b || 0);
        this._red = r;
        this._green = g;
        this._blue = b;
        const color = (r << 16) | (g << 8) | b;
        this._graphics.clear();
        this._graphics.beginFill(color, 1);
        // Draw a rectangle large enough to cover the screen
        this._graphics.drawRect(0, 0, Graphics.width, Graphics.height);
        this._graphics.endFill();
    }
};