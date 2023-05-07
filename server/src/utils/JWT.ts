import jwt, { SignOptions } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './secrets';
import logger from './logger';

export const signJWT = (
  payload: object,
  key: 'access' | 'refresh',
  options?: SignOptions
) => {
  if (key === 'access') {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      ...(options && options),
    });
  } else {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      ...(options && options),
    });
  }
};

export const verifyJWT = <T>(
  token: string,
  key: 'access' | 'refresh'
): T | null => {
  try {
    if (key === 'access') {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as T;
    } else {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as T;
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    logger.error(err.message);
    return null;
  }
};
