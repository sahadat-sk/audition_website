import config from 'config';
import { CookieOptions } from 'express';
import { ENVIRONMENT } from '../utils/secrets';
import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  findUser,
  findUserById,
  signToken,
} from '../services/user.service';
import createHttpError from 'http-errors';
import { signJWT, verifyJWT } from '../utils/JWT';
import redisClient from '../utils/connectRedis';
import logger from '../utils/logger';

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
};
const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
};

if (ENVIRONMENT === 'production') {
  accessTokenCookieOptions.secure = true;
  refreshTokenCookieOptions.secure = true;
}

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    const user = await createUser({ email, password, username });
    res.status(201).json({ status: 'success', data: { user } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 11000) {
      next(createHttpError(409, 'User already exists'));
    } else {
      next(err);
    }
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (
      !user ||
      !(await user.comparePassword(user.password, req.body.password))
    ) {
      return next(createHttpError(401, 'Invalid credentials'));
    }
    const { access_token, refresh_token } = await signToken(user);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    res.status(200).json({ status: 'success', data: { access_token } });
  } catch (err) {
    next(err);
  }
};

export const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', { maxAge: 1 });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token as string;

    logger.debug(`refresh_token from cookie ${req.cookies.refresh_token}`);

    const decoded = verifyJWT<{ sub: string }>(refresh_token, 'refresh');

    logger.debug('decoded refresh_token ', decoded);

    const msg = 'Could not refresh access token';
    if (!decoded) {
      return next(createHttpError(403, msg));
    }
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(createHttpError(403, msg));
    }

    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      return next(createHttpError(403, msg));
    }

    const access_token = signJWT({ sub: user._id }, 'access', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    logger.error(err.message);
    next(err);
  }
};
