import axios from '../lib/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth() as { auth: any; setAuth: any };

  const refresh = async () => {
    const response = await axios.get('api/auth/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        roles: response.data.role,
        accessToken: response.data.access_token,
      };
    });
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
