'use client';

import { getAllQuestions } from '@/api/questionsApi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useGetAllQuestions() {
  const questionQuery = useQuery({
    queryKey: ['questions'],
    queryFn: getAllQuestions,
  });
  console.log(questionQuery);
  return questionQuery;
}
