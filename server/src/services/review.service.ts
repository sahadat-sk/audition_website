import reviewModle, { Review } from '../models/review.model';

export const createReview = async (reivew: Partial<Review>) => {
  const result = await reviewModle.create(reivew);
  return result;
};
