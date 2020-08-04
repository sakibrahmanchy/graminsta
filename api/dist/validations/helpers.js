"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationErrors = void 0;
const class_validator_1 = require("class-validator");
exports.createValidationErrors = (property, errorMessages) => {
    const errors = [];
    errorMessages.map((errorMessage) => {
        const error = new class_validator_1.ValidationError();
        error.constraints = {
            [property]: errorMessage,
        };
        error.property = property;
        errors.push(error);
        return error;
    });
    return errors;
};
//# sourceMappingURL=helpers.js.map