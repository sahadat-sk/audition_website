'use client';
import { TextArea } from '../TextArea';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import { useCreateAnswer, useGetAnswer } from '@/hooks/answers/useAnswers';
import debounce from 'lodash/debounce';
import { Input } from '../input';
import FilePreview from '../FilePreview';

export const FileUploadSchema = z.object({
  file: z
    .any()
    .transform((e) => (!e ? undefined : e))
    .optional(),
});

export type FileUploadType = z.infer<typeof FileUploadSchema>;

const UploadFileSection = ({ questionId }: { questionId: number }) => {
  const [fileImageSrc, setFileImageSrc] = useState('');

  const debouncedApiCall = useCallback(
    debounce((func) => {
      console.log('calling this function');
      func();
    }, 1000),
    []
  );

  const answer = useGetAnswer(questionId);

  const { createAnswerMutation: createAnswer } = useCreateAnswer();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FileUploadType>({
    resolver: zodResolver(FileUploadSchema),
    defaultValues: {
      file: '',
    },
  });

  const onSubmit = (data: any) => {
    data.questionId = questionId;
    createAnswer(data);
  };

  useEffect(() => {
    setFileImageSrc(answer.data?.data?.file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer.data?.data?.file]);

  const handleSave = () => {
    console.log('handle Save');
    debouncedApiCall(handleSubmit(onSubmit));
  };

  const file = watch('file');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="file"
          type="file"
          {...register('file')}
          errMsg={errors.file?.message?.toString()}
        />

        <FilePreview file={file} fileImageSrc={fileImageSrc} reset={reset} />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default UploadFileSection;
