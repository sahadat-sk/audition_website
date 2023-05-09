import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosPrivate.defaults.withCredentials = true;

export const refresAccessToken = async () => {
  const response = await axiosPrivate.get('auth/refresh');
  return response.data;
};

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await refresAccessToken();
      axiosPrivate.defaults.headers.common['Authorization'] =
        'Bearer ' + res.access_token;
      console.log('Access token refreshed!', res.access_token);
      return axiosPrivate(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

axios.defaults.withCredentials = true;
export const register = async (user: any) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, user);
  return response.data;
};

export const login = async (user: any) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, user);
  return response.data;
};

export const logout = async () => {
  const response = await axiosPrivate.post(`${BASE_URL}/auth/logout`);
  return response.data;
};
