import questionModel, { Question } from '../models/question.model';
import { uploadImage } from './coudinary.service';

export const createQuestion = async (
  input: Partial<Question>,
  localFilePath?: string
) => {
  try {
    if (localFilePath) {
      const url = await uploadImage(localFilePath);
      input.file = url;
    }
    if (input.options) {
      input.options = JSON.parse(input.options.toString());
    }
    const question = await questionModel.create(input);
    return question;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

export const findAllQuestions = async () => {
  const questions = await questionModel.find();
  return questions;
};

export const findQuestionById = async (id: string) => {
  const question = await questionModel.findById(id);
  return question;
};

export const updateQuestion = async (
  id: string,
  input: Partial<Question>,
  localFilePath?: string
) => {
  if (localFilePath) {
    const url = await uploadImage(localFilePath);
    input.file = url;
  }
  if (input.options) {
    input.options = JSON.parse(input.options.toString());
  }
  const question = await questionModel.findByIdAndUpdate(id, input, {
    new: true,
  });
  return question;
};
