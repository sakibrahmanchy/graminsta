// eslint-disable-next-line import/prefer-default-export
/**
 * Generate a random number in given range (might be float).
 * @param min
 * @param max
 */
export const getRandomNumberInRange = (min, max) => Math.random() * (max - min) + min;

/**
 * Generate a random integer number in given range.
 * @param min
 * @param max
 */
export const getRandomIntegerNumberInRange = (min, max) => Math.floor(getRandomNumberInRange(min, max));
