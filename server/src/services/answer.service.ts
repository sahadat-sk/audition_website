import { FilterQuery } from 'mongoose';
import answerModel, { Answer } from '../models/answer.model';
import { uploadImage } from './coudinary.service';

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

// export const findAllQuestions = async () => {
//   const questions = await questionModel.find();
//   return questions;
// };

// export const findQuestionById = async (id: string) => {
//   const question = await questionModel.findById(id);
//   return question;
// };

// export const updateQuestion = async (
//   id: string,
//   input: Partial<Question>,
//   localFilePath?: string
// ) => {
//   if (localFilePath) {
//     const url = await uploadImage(localFilePath);
//     input.file = url;
//   }
//   if (input.options) {
//     input.options = JSON.parse(input.options.toString());
//   }
//   const question = await questionModel.findByIdAndUpdate(id, input, {
//     new: true,
//   });
//   return question;
// };

// export const deleteQuestion = async (id: string) => {
//   const question = await questionModel.findByIdAndDelete(id);
//   return question;
// };
