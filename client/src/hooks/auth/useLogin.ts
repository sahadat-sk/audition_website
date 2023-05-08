'use client';

import { login } from '@/api/authApi';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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

export function useLogin() {
  const router = useRouter();
  const { mutate: loginMutation } = useMutation<
    User,
    unknown,
    {
      email: string;
      password: string;
    },
    unknown
  >(({ email, password }) => login({ email, password }), {
    onSuccess: (data) => {
      toast('Login Successful', { type: 'success' });
      router.replace('/dashboard');
    },
    onError: (error) => {
      toast("Couldn't Login", { type: 'error' });
      router.replace('/');
    },
  });
  return loginMutation;
}
