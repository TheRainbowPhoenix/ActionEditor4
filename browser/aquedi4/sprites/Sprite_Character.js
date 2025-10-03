import { Sprite } from "../core/Sprite.js";

export function Sprite_Character() {
    this.initialize(...arguments);
}

Sprite_Character.prototype = Object.create(Sprite.prototype);
Sprite_Character.prototype.constructor = Sprite_Character;

Sprite_Character.prototype.initialize = function(character) {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.setCharacter(character);
};

Sprite_Character.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._character = null;
    this._characterName = "";
    this._characterIndex = 0;
};

Sprite_Character.prototype.setCharacter = function(character) {
    this._character = character;
};

Sprite_Character.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
    this.updateFrame();
    this.updatePosition();
};

Sprite_Character.prototype.updateBitmap = function() {
    if (this.isImageChanged()) {
        this._characterName = this._character._characterName;
        this._characterIndex = this._character._characterIndex;
        this._bitmap = ImageManager.loadCharacter(this._characterName);
    }
};

Sprite_Character.prototype.isImageChanged = function() {
    return (
        this._characterName !== this._character._characterName ||
        this._characterIndex !== this._character._characterIndex
    );
};

Sprite_Character.prototype.updateFrame = function() {
    const pw = this.patternWidth();
    const ph = this.patternHeight();
    const sx = (this.characterBlockX() + this._character._pattern) * pw;
    const sy = (this.characterBlockY() + (this._character._direction - 2) / 2) * ph;
    this.setFrame(sx, sy, pw, ph);
};

Sprite_Character.prototype.characterBlockX = function() {
    const index = this._character._characterIndex;
    return (index % 4) * 3;
};

Sprite_Character.prototype.characterBlockY = function() {
    const index = this._character._characterIndex;
    return Math.floor(index / 4) * 4;
};

Sprite_Character.prototype.patternWidth = function() {
    return this._bitmap ? this._bitmap.width / 12 : 1;
};

Sprite_Character.prototype.patternHeight = function() {
    return this._bitmap ? this._bitmap.height / 8 : 1;
};

Sprite_Character.prototype.updatePosition = function() {
    this.x = this._character._realX; // screenX();
    this.y = this._character._realY; // screenY();
    this.z = 1; // this._character.screenZ();

    // this.x = this._character._realX * $gameMap.tileWidth();
    // this.y = this._character._realY * $gameMap.tileHeight();
    // this.z = 1;
};