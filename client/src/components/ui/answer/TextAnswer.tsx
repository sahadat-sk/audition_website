'use client';
import { TextArea } from '../TextArea';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { useCreateAnswer, useGetAnswer } from '@/hooks/answers/useAnswers';
import { getAnswerByQuestionIdAndUserId } from '@/api/answerApi';
import useAuth from '@/hooks/useAuth';

export const TextAreaSchema = z.object({
  text: z.string().min(1, 'Answer must not be empty!'),
});

export type TextAreaType = z.infer<typeof TextAreaSchema>;

const TextAnswer = ({ questionId }: { questionId: number }) => {
  const answer = useGetAnswer(questionId);
  const { createAnswerMutation: createAnswer } = useCreateAnswer();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TextAreaType>({
    resolver: zodResolver(TextAreaSchema),
  });
  const onSubmit = (data: any) => {
    data.questionId = questionId;
    createAnswer(data);
  };

  useEffect(() => {
    setValue('text', answer.data?.data?.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer.data?.data?.text]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          className="mb-20"
          placeholder="Write your answer here..."
          {...register('text', {
            onBlur: handleSubmit(onSubmit),
          })}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default TextAnswer;
