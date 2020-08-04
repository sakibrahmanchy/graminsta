"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomIntegerNumberInRange = exports.getRandomNumberInRange = void 0;
// eslint-disable-next-line import/prefer-default-export
exports.getRandomNumberInRange = (min, max) => Math.random() * (max - min) + min;
exports.getRandomIntegerNumberInRange = (min, max) => Math.floor(exports.getRandomNumberInRange(min, max));
//# sourceMappingURL=helpers.js.map