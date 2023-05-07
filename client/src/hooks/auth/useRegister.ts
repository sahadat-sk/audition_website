'use client';

import { register } from '@/api/authApi';
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
type IUserRegister = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;
export function useRegister() {
  const router = useRouter();
  const { mutate: singInMutation } = useMutation<
    User,
    unknown,
    {
      username: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    },
    unknown
  >(
    ({ username, email, password, passwordConfirmation }) =>
      register({ username, email, password, passwordConfirmation }),
    {
      onSuccess: (data) => {
        toast('Signup Successful', { type: 'success' });
        router.replace('/dashboard');
      },
      onError: (error) => {
        toast("Couldn't sign up", { type: 'error' });
        router.replace('/');
      },
    }
  );
  return singInMutation;
}
