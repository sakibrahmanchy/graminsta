import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import * as express from 'express';

/**
 * Express middleware to catch all errors thrown in controllers.
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
   * @param {any} error An thrown object (error)
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
      this.sendResponse(res, {
        errors,
        data: null,
      });
      return;
    }

    this.sendResponse(res, error);
  }

  sendResponse(res, data) {
    if (!res.headersSent) {
      // Reached to an undefined url. Redirect to home.
      res.json(data);
    }
    res.end();
  }
}
