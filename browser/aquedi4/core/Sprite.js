import { Rectangle } from "./Rectangle"
import { clamp } from "./Core"
import { Bitmap } from "./Bitmap.js";

export function Sprite() {
    this.initialize(...arguments);
}

Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.initialize = function(bitmap) {
    // PIXI.Container.call(this);
    const texture = bitmap ? new PIXI.Texture(bitmap.baseTexture) : PIXI.Texture.EMPTY;
    PIXI.Sprite.call(this, texture);
    this._bitmap = bitmap;
    this._frame = new PIXI.Rectangle(0, 0, 0, 0);
    this._refreshFrame = true;

    this._hue = 0;
    this._blendColor = [0, 0, 0, 0];
    this._colorTone = [0, 0, 0, 0];
    this._colorFilter = null;
    this._blendMode = PIXI.BLEND_MODES.NORMAL;
    this._hidden = false;

    if (bitmap) {
        bitmap.addLoadListener(this._onBitmapLoad.bind(this));
    }
};

Sprite.prototype.update = function() {
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};

Sprite.prototype._onBitmapLoad = function() {
    if (this._refreshFrame && this._bitmap) {
        this._refreshFrame = false;
        this._frame.width = this._bitmap.width;
        this._frame.height = this._bitmap.height;
    }
    this._refresh();
};

Sprite.prototype.setFrame = function(x, y, width, height) {
    this._refreshFrame = false;
    const frame = this._frame;
    if (
        x !== frame.x ||
        y !== frame.y ||
        width !== frame.width ||
        height !== frame.height
    ) {
        frame.x = x;
        frame.y = y;
        frame.width = width;
        frame.height = height;
        this._refresh();
    }
};

Sprite.prototype._refresh = function() {
    const texture = this.texture;
    const frameX = Math.floor(this._frame.x);
    const frameY = Math.floor(this._frame.y);
    const frameW = Math.floor(this._frame.width);
    const frameH = Math.floor(this._frame.height);
    const baseTexture = this._bitmap ? this._bitmap.baseTexture : null;
    const baseTextureW = baseTexture ? baseTexture.width : 0;
    const baseTextureH = baseTexture ? baseTexture.height : 0;
    const realX = clamp(0, frameX, baseTextureW);
    const realY = clamp(0, frameY, baseTextureH);
    const realW = clamp(0, (frameW - realX + frameX), baseTextureW - realX);
    const realH = clamp(0, (frameH - realY + frameY), baseTextureH - realY);
    const frame = new Rectangle(realX, realY, realW, realH);
    if (texture) {
        this.pivot.x = frameX - realX;
        this.pivot.y = frameY - realY;
        if (baseTexture) {
            texture.baseTexture = baseTexture;
            try {
                texture.frame = frame;
            } catch (e) {
                texture.frame = new Rectangle();
            }
        }
        texture._updateID++;
    }
};