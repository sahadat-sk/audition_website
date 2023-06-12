import { createAnswer } from '@/api/answerApi';
import useAuth from '../useAuth';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

type Answer = {
  text?: string;
  questionId: string;
  file?: any;
  selectedOptions?: string[];
};

export function useCreateAnswer() {
  const { auth } = useAuth() as {
    auth: any;
  };
  const { mutate: createAnswerMutation, isLoading } = useMutation<
    Answer,
    unknown,
    Answer,
    unknown
  >((answer: Answer) => createAnswer(auth.user.id, answer), {
    onSuccess: () => {
      toast('Question Created', { type: 'success' });
    },
    onError: (error) => {
      console.error(error);
      toast('Failed to create Question', { type: 'error' });
    },
  });
  return { createAnswerMutation, isLoading };
}
