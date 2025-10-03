import { Game_Character } from "./Game_Character.js";
import { Input } from "../core/Input.js";

/**
 * The game object class for the player.
 */
export function Game_Player() {
    this.initialize(...arguments);
}

Game_Player.prototype = Object.create(Game_Character.prototype);
Game_Player.prototype.constructor = Game_Player;

Game_Player.prototype.initialize = function() {
    Game_Character.prototype.initialize.call(this);
    // this.setMoveSpeed(4);
};

Game_Player.prototype.update = function(sceneActive) {
    const lastScrolledX = this.scrolledX();
    const lastScrolledY = this.scrolledY();
    const wasMoving = this.isMoving();
    if (sceneActive) {
        this.moveByInput();
    }
    Game_Character.prototype.update.call(this);
    this.updateScroll(lastScrolledX, lastScrolledY);
};

Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving()) {
        if (Input.isPressed("down")) this.moveStraight(2);
        if (Input.isPressed("left")) this.moveStraight(4);
        if (Input.isPressed("right")) this.moveStraight(6);
        if (Input.isPressed("up")) this.moveStraight(8);
    }
};

Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    const x1 = lastScrolledX;
    const y1 = lastScrolledY;
    const x2 = this.scrolledX();
    const y2 = this.scrolledY();
    if (y2 > y1) $gameMap.scrollDown(y2 - y1);
    if (x2 < x1) $gameMap.scrollLeft(x1 - x2);
    if (x2 > x1) $gameMap.scrollRight(x2 - x1);
    if (y2 < y1) $gameMap.scrollUp(y1 - y2);
};

Game_Player.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
};

Game_Player.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
};

Game_Player.prototype.center = function(x, y) {
    $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
};

Game_Player.prototype.locate = function(x, y) {
    Game_Character.prototype.locate.call(this, x, y);
    this._realX = x;
    this._realY = y;
    this.center(x, y);
};

Game_Player.prototype.scrolledX = function() {
    return this._realX;
};

Game_Player.prototype.scrolledY = function() {
    return this._realY;
};