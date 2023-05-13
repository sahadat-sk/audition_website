import axios from 'axios';
import { axiosPrivate } from './authApi';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllQuestions = async () => {
  const response = await axiosPrivate.get(`${BASE_URL}/questions`);
  return response.data;
};
