import jwt, { SignOptions } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './secrets';

export const signJWT = (payload: object, options?: SignOptions) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    ...(options && options),
  });
};

export const verifyJWT = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as T;
  } catch (err) {
    return null;
  }
};
