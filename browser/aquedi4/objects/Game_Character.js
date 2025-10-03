/**
 * The superclass for player and events. Handles position and movement.
 */
export function Game_Character() {
    this.initialize(...arguments);
}

Game_Character.prototype.initialize = function() {
    this.initMembers();
};

Game_Character.prototype.initMembers = function() {
    this._x = 0;
    this._y = 0;
    this._realX = 0;
    this._realY = 0;
    this._moveSpeed = 4;
    this._direction = 2; // 2:down, 4:left, 6:right, 8:up
    this._pattern = 1;
    this._characterName = "";
    this._characterIndex = 0;
    this._animationCount = 0;
};

Object.defineProperties(Game_Character.prototype, {
    x: { get: function() { return this._x; }, configurable: true },
    y: { get: function() { return this._y; }, configurable: true }
});

Game_Character.prototype.pos = function(x, y) {
    return this._x === x && this._y === y;
};

Game_Character.prototype.update = function() {
    this.updateMove();
    this.updateAnimation();
};

Game_Character.prototype.updateMove = function() {
    if (this._x < this._realX) {
        this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
    }
    if (this._x > this._realX) {
        this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
    }
    if (this._y < this._realY) {
        this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
    }
    if (this._y > this._realY) {
        this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
    }
};

Game_Character.prototype.updateAnimation = function() {
    if (this.isMoving()) {
        this._animationCount++;
    } else {
        this._animationCount = 0;
    }

    if (this._animationCount > 18 - this._moveSpeed * 2) {
        this._pattern = (this._pattern + 1) % 4;
        this._animationCount = 0;
    }
};

Game_Character.prototype.isMoving = function() {
    return this._realX !== this._x || this._realY !== this._y;
};

Game_Character.prototype.distancePerFrame = function() {
    return Math.pow(2, this._moveSpeed) / 256;
};

Game_Character.prototype.moveStraight = function(d) {
    this.setDirection(d);
    // Simple movement without collision for this lite engine
    this._x += (d === 6 ? 1 : d === 4 ? -1 : 0);
    this._y += (d === 2 ? 1 : d === 8 ? -1 : 0);
};

Game_Character.prototype.setDirection = function(d) {
    if (d) {
        this._direction = d;
    }
};

Game_Character.prototype.locate = function(x, y) {
    this._x = x;
    this._y = y;
    this._realX = x;
    this._realY = y;
};

Game_Character.prototype.setImage = function(characterName, characterIndex) {
    this._characterName = characterName;
    this._characterIndex = characterIndex;
};