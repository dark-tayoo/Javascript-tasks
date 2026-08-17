// src/utils/delay.js

/**
 * Returns a Promise that resolves after a given number of milliseconds.
 * @param {number} ms - Milliseconds to delay.
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
