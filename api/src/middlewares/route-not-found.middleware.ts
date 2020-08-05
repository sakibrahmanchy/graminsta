import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
@Middleware({ type: 'after' })
export class RouteNotFoundMiddleware implements ExpressMiddlewareInterface {

  public use(req: Request, res: Response, next?: NextFunction): void {
    if (!res.headersSent) {
      // Reached to an undefined url. Redirect to home.
      res.redirect('/');
    }
    res.end();
  }

}
