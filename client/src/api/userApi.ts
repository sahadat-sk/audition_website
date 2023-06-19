import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getAllUsers = async () => {
  const response = await axiosPrivate.get(`${BASE_URL}/users`);
  return response.data;
};
