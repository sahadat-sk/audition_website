'use client';

import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
} from '@/api/questionsApi';
import { useMutation, useQuery } from '@tanstack/react-query';
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
export function useDeleteQuestion() {
  const { mutate: deleteQuestionMutation, isLoading } = useMutation<
    Question,
    unknown,
    number,
    unknown
  >((id) => deleteQuestion(id), {
    onSuccess: (data) => {
      toast('Question Deleted', { type: 'success' });
    },
    onError: (error) => {
      toast('Failed to delete Question', { type: 'error' });
    },
  });
  return { deleteQuestionMutation, isLoading };
}
