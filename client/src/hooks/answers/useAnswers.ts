import { createAnswer, getAnswerByQuestionIdAndUserId } from '@/api/answerApi';
import useAuth from '../useAuth';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';

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
      toast('Saving...', { type: 'default' });
    },
    onError: (error) => {
      console.error(error);
      toast('Failed to save!!!', { type: 'error' });
    },
  });
  return { createAnswerMutation, isLoading };
}

export function useGetAnswer(questionId: number) {
  const { auth } = useAuth() as {
    auth: any;
  };
  const questionQuery = useQuery({
    queryKey: ['answer', questionId],
    queryFn: () => getAnswerByQuestionIdAndUserId(auth.user.id, questionId),
  });
  return questionQuery;
}
