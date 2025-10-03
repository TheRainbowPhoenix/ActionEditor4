/**
 * The static class that handles keyboard input.
 */
export function Input() {
    throw new Error("This is a static class");
}

Input.initialize = function() {
    this.clear();
    this._setupEventHandlers();
};

Input.keyMapper = {
    37: "left",    // left arrow
    38: "up",      // up arrow
    39: "right",   // right arrow
    40: "down",    // down arrow
    90: "ok",      // Z
    88: "cancel",  // X
    67: "action"   // C
};

Input.clear = function() {
    this._currentState = {};
};

Input.update = function() {
    // This is handled by event listeners, no polling needed for this simple version
};

Input.isPressed = function(keyName) {
    return !!this._currentState[keyName];
};

Input._setupEventHandlers = function() {
    document.addEventListener("keydown", this._onKeyDown.bind(this));
    document.addEventListener("keyup", this._onKeyUp.bind(this));
    window.addEventListener("blur", this._onLostFocus.bind(this));
};

Input._onKeyDown = function(event) {
    const buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = true;
    }
};

Input._onKeyUp = function(event) {
    const buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = false;
    }
};

Input._onLostFocus = function() {
    this.clear();
};