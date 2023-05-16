'use client';

import { createQuestion, getAllQuestions } from '@/api/questionsApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
type Question = {
  text: string;
  file?: any;
  type: string;
  options?: {}[];
};

export function useGetAllQuestions() {
  const questionQuery = useQuery({
    queryKey: ['questions'],
    queryFn: getAllQuestions,
  });
  return questionQuery;
}

export function useCreateQuestion() {
  const router = useRouter();
  const { mutate: createQuestionMutation, isLoading } = useMutation<
    Question,
    unknown,
    Question,
    unknown
  >((question) => createQuestion(question), {
    onSuccess: (data) => {
      toast('Question Created', { type: 'success' });
    },
    onError: (error) => {
      toast('Failed to create Question', { type: 'error' });
    },
  });
  return { createQuestionMutation, isLoading };
}
