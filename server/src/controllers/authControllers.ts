import { RequestHandler, Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import User from '../models/User';

interface IUer {
  username: string;
  email: string;
  password: string;
  role?: number;
  startTime?: Date;
  endTime?: Date;
}

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw createHttpError(400, 'All the fields are required');
    }
    const newUer: IUer = { username, email, password, role: 0 };
    const match = await User.findOne({ email });
    if (match) {
      throw createHttpError(409, 'User already exists');
    }
    User.create(newUer);
    res.status(200).json({ message: 'user created' });
  } catch (error) {
    next(error);
  }
};

export default { signup };
