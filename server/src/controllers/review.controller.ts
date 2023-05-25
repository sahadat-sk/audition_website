import { Ref } from '@typegoose/typegoose';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { createReview } from '../services/review.service';

export const createReviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { review, rating, reviewerId } = req.body;
    const userId = req.params.userid as unknown as Ref<User>;

    const result = await createReview({ review, rating, reviewerId, userId });

    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};
