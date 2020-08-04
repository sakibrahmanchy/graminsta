"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
/**
 * Express middleware to catch all errors throwed in controlers.
 * Should be first in error chain as it sends response to client.
 *
 * @export
 * @class CustomErrorHandler
 * @implements {ErrorMiddlewareInterface}
 */
let CustomErrorHandler = class CustomErrorHandler {
    /**
     * Error handler - sets response code and sends json with error message.
     * Handle: standard node error, HttpError, ValidationError and string.
     *
     * @param {any} error An throwed object (error)
     * @param {express.Request} req The Express request object
     * @param {express.Response} res The Express response object
     * @param {express.NextFunction} next The next Express middleware function
     */
    error(error, req, res, next) {
        /**
         * Format validation errors to a recognizable and easy to use format.
         * @param validationError
         */
        const formatError = (validationError) => {
            const { constraints, property } = validationError;
            return {
                [property]: Object.values(constraints)[0],
            };
        };
        /**
         * Merge all errors together to format clear validation errors
         */
        let errors = [];
        const { errors: errs = [], validationErrors = [], } = error;
        if (errs.length || validationErrors.length) {
            for (const validationError of errs) {
                const formattedValidationError = formatError(validationError);
                errors = [...errors, formattedValidationError];
            }
            for (const validationError of validationErrors) {
                const formattedValidationError = formatError(validationError);
                errors = [...errors, formattedValidationError];
            }
        }
        if (errors.length) {
            res.json({
                errors,
                data: null,
            });
            return;
        }
        res.json(error);
    }
};
CustomErrorHandler = __decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], CustomErrorHandler);
exports.CustomErrorHandler = CustomErrorHandler;
//# sourceMappingURL=custom-error-hander.js.map