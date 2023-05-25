import { FilterQuery } from 'mongoose';
import answerModel, { Answer } from '../models/answer.model';
import { uploadImage } from './coudinary.service';
import { Ref } from '@typegoose/typegoose';
import { User } from '../models/user.model';

export const createOrUpdateAnswer = async (
  filter: FilterQuery<Answer>,
  input: Partial<Answer>,
  localFilePath?: string
) => {
  try {
    if (localFilePath) {
      const url = await uploadImage(localFilePath);
      input.file = url;
    }
    if (input.selectedOptions) {
      input.selectedOptions = JSON.parse(input.selectedOptions.toString());
    }
    const answer = await answerModel.findOneAndUpdate(filter, input, {
      new: true,
      upsert: true,
    });
    return answer;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};
export const getAllAnswersByUserId = async (userId: Ref<User>) => {
  const result = await answerModel.find({ userId });
  for (const item of result) {
    await item.populate('questionId');
  }
  return result;
};