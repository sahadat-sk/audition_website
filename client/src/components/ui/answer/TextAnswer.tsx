'use client';
import { TextArea } from '../TextArea';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { useCreateAnswer, useGetAnswer } from '@/hooks/answers/useAnswers';
import debounce from 'lodash/debounce';

export const TextAreaSchema = z.object({
  text: z.string().min(1, 'Answer must not be empty!'),
});

export type TextAreaType = z.infer<typeof TextAreaSchema>;

const TextAnswer = ({ questionId }: { questionId: number }) => {
  const debouncedApiCall = debounce((func) => {
    func();
  }, 1000);

  const answer = useGetAnswer(questionId);
  const { createAnswerMutation: createAnswer } = useCreateAnswer();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TextAreaType>({
    resolver: zodResolver(TextAreaSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = (data: any) => {
    data.questionId = questionId;
    createAnswer(data);
  };

  useEffect(() => {
    reset({ text: answer.data?.data?.text });
    console.log('resetting.....');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer.data?.data?.text]);

  const handleSave = () => {
    debouncedApiCall(handleSubmit(onSubmit));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          className="mb-20"
          placeholder="Write your answer here..."
          {...register('text', {
            onBlur: handleSave,
            onChange: handleSave,
          })}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default TextAnswer;
