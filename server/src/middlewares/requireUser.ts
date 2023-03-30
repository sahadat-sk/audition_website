import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user || user.length === 0) {
      return next(
        createHttpError(401, 'Invalid token, or session has expired')
      );
    }

    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    next(err);
  }
};
