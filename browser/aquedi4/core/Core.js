/**
 * Generates a random integer in the range (0, max-1).
 *
 * @param {number} max - The upper boundary (excluded).
 * @returns {number} A random integer.
 */
export function randomInt(max) {
    return Math.floor(max * Math.random());
};

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} min - The lower boundary.
 * @param {number} val - The value.
 * @param {number} max - The upper boundary.
 * @returns {number} A number in the range (min, max).
 */
export function clamp(min, val, max) {
    return Math.min(Math.max(val, min), max);
}