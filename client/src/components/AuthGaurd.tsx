'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from '../lib/axios';

type Props = {
  allowedRoles: string[];
  children: JSX.Element;
};

export function AuthGuard(props: Props) {
  const { auth, setAuth } = useAuth() as {
    auth: any;
    setAuth: any;
  };

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios.get('api/auth/refresh', {
          withCredentials: true,
        });
        const { data } = await axios.get('api/users/me', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${response?.data?.access_token}`,
          },
        });
        const user = {
          role: data?.data?.user?.role,
          email: data?.data?.user?.email,
          username: data?.data?.user?.username,
        };
        if (!user.email) {
          router.push('/login');
        }
        if (!props.allowedRoles.includes(user.role)) {
          router.push('/');
        }
        setAuth({
          accessToken: response?.data?.access_token,
          user,
        });
      } catch (err: any) {
        router.push('/login');
      }
    };
    console.log('authguard running ');
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user?.email]);

  /* show loading indicator while the auth provider is still initializing */
  if (auth?.user?.email) {
    return <>{props.children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
