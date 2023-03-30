import config from 'config';
import { CookieOptions } from 'express';
import { ENVIRONMENT } from '../utils/secrets';
import { Request, Response, NextFunction } from 'express';
import { createUser, findUser, signToken } from '../services/user.service';
import createHttpError from 'http-errors';

const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
};

if (ENVIRONMENT === 'production') {
  accessTokenCookieOptions.secure = true;
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
    const { access_token } = await signToken(user);
    res.cookie('accessToken', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    res.status(200).json({ status: 'success', data: { access_token } });
  } catch (err) {
    next(err);
  }
};
