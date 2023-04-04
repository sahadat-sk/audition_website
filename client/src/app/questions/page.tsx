'use client';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Questions = (props: Props) => {
  const router = useRouter();
  const { auth } = useAuth() as { auth: any };
  const axios = useAxiosPrivate();
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/');
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1>HIIIIIIII.... {auth.user.username}</h1>
      <h1>Questions</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Questions;
