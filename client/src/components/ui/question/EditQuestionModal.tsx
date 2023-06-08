import Modal from '../Modal';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../input';
import { useEffect } from 'react';
import Button from '../Button';
import LargeHeading from '../LargeHeading';
import {
  useCreateQuestion,
  useEditQuestion,
} from '@/hooks/questions/useQuestions';
import Options from './Options';
import FilePreview from '../FilePreview';
import { formSchema } from './AddQuestionModal';
import { Select } from '../Select';
import { QUESTION_TYPES } from '../../../../../globalconfig';

export type FormSchemaType = z.infer<typeof formSchema>;

type EditQuestionModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: FormSchemaType;
  id: number;
};

export default function EditQuestionModal({
  open,
  setOpen,
  defaultValues,
  id,
}: EditQuestionModalProps) {
  const { editQuestionMutation: editQuestion, isLoading } = useEditQuestion();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const type = watch('type');

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    editQuestion({ id, question: data });
    setOpen(false);
  };
  useEffect(() => {
    if (type === QUESTION_TYPES.FILE || type === QUESTION_TYPES.TEXT) {
      reset({
        type,
        options: [],
      });
    }
  }, [type]);

  const file = watch('file');
  return (
    <Modal open={open} setOpen={setOpen}>
      <LargeHeading size={'sm'} className="mb-2">
        Edit question
      </LargeHeading>
      <form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Question"
          type="text"
          {...register('text')}
          errMsg={errors.text?.message}
        />
        <Input
          label="file"
          type="file"
          {...register('file')}
          errMsg={errors.file?.message?.toString()}
        />
        <FilePreview file={file} reset={reset} />
        <Select
          label="Question Type"
          options={[
            { key: QUESTION_TYPES.TEXT, value: 'Text' },
            { key: QUESTION_TYPES.SINGLE, value: 'Single Select' },
            { key: QUESTION_TYPES.MULTI, value: 'Multi Select' },
            { key: QUESTION_TYPES.FILE, value: 'File' },
          ]}
          {...register('type')}
        />
        {type == QUESTION_TYPES.SINGLE || type == QUESTION_TYPES.MULTI ? (
          <Options control={control} register={register} errors={errors} />
        ) : null}
        <Button colorVarient={'blue'} type="submit">
          Edit Question
        </Button>
      </form>
    </Modal>
  );
}
