import config from 'config';
import { CookieOptions } from 'express';
import { ENVIRONMENT } from '../utils/secrets';
import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  findAndUpdate,
  findUser,
  findUserById,
  signToken,
} from '../services/user.service';
import createHttpError from 'http-errors';
import { signJWT, verifyJWT } from '../utils/JWT';
import redisClient from '../utils/connectRedis';
import logger from '../utils/logger';
import {
  getGoogleOauthToken,
  getGoogleUser,
} from '../services/session.service';

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: false,
  sameSite: false,
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
};
const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: false,
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
      user.provider !== 'local' || // if user is not registered with local strategy
      !(await user.comparePassword(user.password, req.body.password))
    ) {
      return next(createHttpError(401, 'Invalid credentials'));
    }

    const { access_token, refresh_token } = await signToken(user);
    console.log('cookie options', refreshTokenCookieOptions);
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

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await redisClient.flushDb();

    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });

    res.status(200).json({ status: 'success' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logger.error(err.message);
    next(err);
  }

  // res.redirect(`${config.get<string>('origin')}/login`);
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
      console.log('could not decode');
      return next(createHttpError(403, msg));
    }
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      console.log('session fault');
      return next(createHttpError(403, msg));
    }

    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      console.log('user fault');
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logger.error(err.message);
    next(err);
  }
};

export const googleOauthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';
    if (!code) {
      return next(createHttpError(401, 'Authorization code not provided'));
    }
    const { id_token, access_token } = await getGoogleOauthToken({ code });
    const { name, verified_email, email } = await getGoogleUser({
      id_token,
      access_token,
    });
    if (!verified_email) {
      return next(createHttpError(401, 'Email not verified'));
    }
    const user = await findAndUpdate(
      { email },
      { username: name, email, provider: 'Google' },
      { upsert: true, new: true, runValidators: false, lean: true }
    );
    if (!user) {
      return res.redirect(`${config.get<string>('origin')}/login`);
    }
    const { access_token: accessToken, refresh_token } = await signToken(user);
    res.cookie('refresh_token', accessToken, refreshTokenCookieOptions);
    res.cookie('access_token', refresh_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
      ),
    });
    res.redirect(`${config.get<string>('origin')}${pathUrl}`);
  } catch (err) {
    next(err);
  }
};
