import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { isArray } from 'class-validator';
import * as express from 'express';

/**
 * Express middleware to catch all errors throwed in controlers.
 * Should be first in error chain as it sends response to client.
 *
 * @export
 * @class CustomErrorHandler
 * @implements {ErrorMiddlewareInterface}
 */
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  /**
   * Error handler - sets response code and sends json with error message.
   * Handle: standard node error, HttpError, ValidationError and string.
   *
   * @param {any} error An throwed object (error)
   * @param {express.Request} req The Express request object
   * @param {express.Response} res The Express response object
   * @param {express.NextFunction} next The next Express middleware function
   */
  public error(
      error: any, req: express.Request, res: express.Response, next: express.NextFunction,
    ) {
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

    let errors: any[] = [];
    const {
      errors: errs = [],
      validationErrors = [],
    } = error;
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
}
