import { Request, Response, NextFunction } from 'express';
import { findAllUsers } from '../services/user.service';
export const getMeHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals?.user;
    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    next(err);
  }
};
export const getAllUsersHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res
      .status(200)
      .json({ status: 'success', result: users.length, data: { users } });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
