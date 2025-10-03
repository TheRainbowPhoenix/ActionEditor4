/**
 * The static class that defines utility methods.
 */
export function Utils() {
    throw new Error("This is a static class");
}

/**
 * Checks whether the platform is a mobile device.
 * @returns {boolean}
 */
Utils.isMobileDevice = function() {
    const r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/i;
    return !!navigator.userAgent.match(r);
};

// Add other generic helper functions here if needed.