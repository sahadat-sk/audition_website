'use client';
import { TextArea } from '../TextArea';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { useCreateAnswer } from '@/hooks/answers/useAnswers';

export const TextAreaSchema = z.object({
  text: z.string().min(1, 'Answer must not be empty!'),
});

export type TextAreaType = z.infer<typeof TextAreaSchema>;

const TextAnswer = ({ questionId }: { questionId: number }) => {
  const { createAnswerMutation: createAnswer } = useCreateAnswer();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<TextAreaType>({
    resolver: zodResolver(TextAreaSchema),
  });
  const onSubmit = (data: any) => {
    data.questionId = questionId;
    createAnswer(data);
  };

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
