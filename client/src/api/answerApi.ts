import { convertAnswerToFormData } from '@/helpers/answerConverters';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Answer = {
  text?: string;
  questionId: string;
  file?: any;
  selectedOptions?: string[];
};

export const postAnswer = async (userId: string, answer: Answer) => {
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
