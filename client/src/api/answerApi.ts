import { convertAnswerToFormData } from '@/helpers/answerConverters';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Answer = {
  text?: string;
  questionId: string;
  file?: any;
  selectedOptions?: string[];
};

export const createAnswer = async (userId: string, answer: Answer) => {
  const answerFormData = convertAnswerToFormData(answer);
  const response = await axios.put(
    `${BASE_URL}/answers/${userId}`,
    answerFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const getAnswerByQuestionIdAndUserId = async (
  userId: number,
  questionId: number
) => {
  const response = await axios.get(
    `${BASE_URL}/answers/${userId}/${questionId}`
  );
  return response.data;
};
