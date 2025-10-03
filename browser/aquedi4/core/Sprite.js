export function Sprite() {
    this.initialize(...arguments);
}

Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.initialize = function(bitmap) {
    const texture = bitmap ? new PIXI.Texture(bitmap.baseTexture) : PIXI.Texture.EMPTY;
    PIXI.Sprite.call(this, texture);
    this.bitmap = bitmap;
};

Sprite.prototype.update = function() {
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};