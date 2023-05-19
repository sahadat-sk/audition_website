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

const formSchema = z.object({
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
    .min(1, 'At least one option is required'),
  file: z
    .any()
    .transform((e) => (!e ? undefined : e))
    .optional(),
  type: z.enum(['text', 'single-select', 'multi-select', 'file']),
});

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

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    editQuestion({ id, question: data });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

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
        <Options control={control} register={register} errors={errors} />
        <Button colorVarient={'blue'} type="submit">
          Edit Question
        </Button>
      </form>
    </Modal>
  );
}
