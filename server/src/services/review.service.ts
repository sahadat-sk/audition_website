import { Ref } from '@typegoose/typegoose';
import reviewModle, { Review } from '../models/review.model';
import userModel, { User } from '../models/user.model';
import { FilterQuery } from 'mongoose';

export const createOrUpdateReview = async (
  filter: FilterQuery<Review>,
  reivew: Partial<Review>
) => {
  const result = await reviewModle.findOneAndUpdate(filter, reivew, {
    new: true,
    upsert: true,
  });
  return result;
};

export const getAllReviews = async (userId: Ref<User>) => {
  const result = await reviewModle.find({ userId });
  return result;
};

export const updateUserRating = async (userId: Ref<User>) => {
  const result = await getAllReviews(userId);
  const rating = getAverageRating(result);

  const newUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { rating },
    { new: true }
  );

  return newUser;
};
export const getAverageRating = (reviews: Review[]) => {
  let ans = 0;
  reviews.forEach((review) => {
    ans += review.rating;
  });
  return ans / reviews.length || 0;
};
