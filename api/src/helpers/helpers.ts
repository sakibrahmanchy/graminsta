// eslint-disable-next-line import/prefer-default-export
export const getRandomNumberInRange = (min, max) => Math.random() * (max - min) + min;

export const getRandomIntegerNumberInRange = (min, max) => Math.floor(getRandomNumberInRange(min, max));
