import axios from 'axios';
import { axiosPrivate } from './authApi';
import { convertQuestionToFormData } from '@/helpers/questionConverter';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllQuestions = async () => {
  const response = await axiosPrivate.get(`${BASE_URL}/questions`);
  return response.data;
};

export const createQuestion = async (question: any) => {
  const questionFormData = convertQuestionToFormData(question);
  const response = await axiosPrivate.post(
    `${BASE_URL}/questions`,
    questionFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};
