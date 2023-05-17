import Modal from '../Modal';
import { any, z } from 'zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../input';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import useFilePreview from '@/hooks/useFilePreview';
import Paragraph from '../Paragraph';
import Button from '../Button';
import LargeHeading from '../LargeHeading';
import { useCreateQuestion } from '@/hooks/questions/useQuestions';
import Options from './Options';

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

type AddQuestionModalProps = {
  open: boolean;
  setOpen: any;
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
      type: 'text',
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    createQuestion(data);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);
  const file = watch('file');
  const [filePreview] = useFilePreview(file);
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
        {filePreview && (
          <div className="flex items-center justify-between w-full gap-2">
            <img
              src={filePreview as string}
              alt="file preview"
              className="w-full"
            />
            <button type="button" onClick={() => reset({ file: null })}>
              <X></X>
            </button>
          </div>
        )}
        <Options control={control} register={register} errors={errors} />
        <Button colorVarient={'green'} type="submit">
          Create Question
        </Button>
      </form>
    </Modal>
  );
}
