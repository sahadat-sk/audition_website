import axios from '../lib/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth() as { auth: any; setAuth: any };

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
