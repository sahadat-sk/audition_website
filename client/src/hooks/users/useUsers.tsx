'use client';
import { getAllUsers } from '@/api/authApi';
import { useQuery } from '@tanstack/react-query';

import useAuth from '../useAuth';
import { toast } from 'react-toastify';

export function useGetAllUsers() {
  const { auth } = useAuth() as { auth: any };
  const questionQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(auth.accessToken),
    onError: () => {
      toast('Failed to fetch users');
    },
  });
  return questionQuery;
}
