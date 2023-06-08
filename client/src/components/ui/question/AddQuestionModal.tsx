import Modal from '../Modal';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../input';
import { useEffect } from 'react';
import Button from '../Button';
import LargeHeading from '../LargeHeading';
import { useCreateQuestion } from '@/hooks/questions/useQuestions';
import Options from './Options';
import FilePreview from '../FilePreview';
import { Select } from '../Select';
import { QUESTION_TYPES } from '../../../../../globalconfig';

export const formSchema = z.object({
  text: z
    .string()
    .min(1, 'Question is required')
    .max(100, 'Question must be less than 100 characters'),
  options: z
    .array(
      z.object({
        option: z.string().min(1, 'Option is required'),
      })
    )
    .optional(),
  file: z
    .any()
    .transform((e) => (!e ? undefined : e))
    .optional(),
  type: z.enum([
    QUESTION_TYPES.TEXT,
    QUESTION_TYPES.SINGLE,
    QUESTION_TYPES.MULTI,
    QUESTION_TYPES.FILE,
  ]),
});

export type FormSchemaType = z.infer<typeof formSchema>;

type AddQuestionModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddQuestionModal({
  open,
  setOpen,
}: AddQuestionModalProps) {
  const { createQuestionMutation: createQuestion, isLoading } =
    useCreateQuestion();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      options: [
        {
          option: '',
        },
      ],
      type: QUESTION_TYPES.TEXT,
    },
  });
  const file = watch('file');
  const type = watch('type');

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    createQuestion(data);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  useEffect(() => {
    if (type === QUESTION_TYPES.FILE || type === QUESTION_TYPES.TEXT) {
      reset({
        type,
        options: [],
      });
    }
  }, [type]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <LargeHeading size={'sm'} className="mb-2">
        Create question
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
        <Button colorVarient={'green'} type="submit">
          Create Question
        </Button>
        <p>{errors.options?.message?.toString()}</p>
      </form>
    </Modal>
  );
}
