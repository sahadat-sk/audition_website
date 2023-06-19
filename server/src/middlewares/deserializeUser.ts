import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { findUserById } from '../services/user.service';
import redisClient from '../utils/connectRedis';
import { verifyJWT } from '../utils/JWT';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else {
      const access = req.cookies.refresh_token as string;
      console.log('refresh token in deserializeuser.ts ', req.cookies);
      accessToken = req.cookies.access_token;
    }
    if (!accessToken) {
      // console.error(req.headers.cookies);
      return next(
        createHttpError(401, 'You are not logged in, no access token found')
      );
    }

    const decoded = verifyJWT<{ sub: string }>(accessToken, 'access');

    if (!decoded) {
      return next(createHttpError(401, 'Invalid token or user does not exist'));
    }

    const session = await redisClient.get(decoded.sub);
    if (!session) {
      return next(createHttpError(401, 'User session has expired'));
    }

    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      return next(createHttpError(401, 'User does not exist'));
    }

    res.locals.user = user;
    console.log('DESERIALIZATION DONE !!!!!');

    next();
  } catch (err) {
    next(err);
  }
};
