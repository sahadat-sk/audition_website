import { Ref } from '@typegoose/typegoose';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import {
  createOrUpdateReview,
  updateUserRating,
} from '../services/review.service';

export const createReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { review, rating, reviewerId } = req.body;
    const userId = req.params.userid as unknown as Ref<User>;

    const result = await createOrUpdateReview(
      { userId, reviewerId },
      { review, rating, reviewerId, userId }
    );

    await updateUserRating(userId);

    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};
