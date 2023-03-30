import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      return next(
        createHttpError(
          403,
          'You do not have permission to perform this action.'
        )
      );
    }

    next();
  };
