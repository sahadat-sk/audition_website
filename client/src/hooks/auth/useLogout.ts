'use client';

import { logout } from '@/api/authApi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';

type User = {
  username: string;
  email: string;
  password: string;
  rollNumber: string;
  contactNumber: string;
  verified: boolean;
  provider: string;
  role: string;
  startTime: Date;
  endTime: Date;
};

export function useLogout() {
  const { auth, setAuth } = useAuth() as { auth: any; setAuth: any };
  const router = useRouter();
  const { mutate: logoutMutation } = useMutation<User, unknown, {}, unknown>(
    () => logout(),
    {
      onSuccess: (data) => {
        toast('Logout Successful', { type: 'success' });
        setAuth({});
        router.replace('/');
      },
      onError: (error) => {
        toast("Couldn't Logout", { type: 'error' });
      },
    }
  );
  return logoutMutation;
}
