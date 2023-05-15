import Modal from '../Modal';
import { any, z } from 'zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../input';
import { Delete, X } from 'lucide-react';
import { SetStateAction, use, useEffect } from 'react';
import useFilePreview from '@/hooks/useFilePreview';
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

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
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  type: z.enum(['text', 'single-select', 'multi-select', 'file']),
});

type FormSchemaType = z.infer<typeof formSchema>;

type AddQuestionModalProps = {
  open: boolean;
  setOpen: any;
};

export default function AddQuestionModal({
  open,
  setOpen,
}: AddQuestionModalProps) {
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
      file: '',
      type: 'text',
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);
  const file = watch('file');
  const [filePreview, setPreview] = useFilePreview(file);
  return (
    <Modal open={open} setOpen={setOpen}>
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
              className="w-1/2"
            />
            <button type="button" onClick={() => reset({ file: '' })}>
              <Delete height={50} size={30} />
            </button>
          </div>
        )}
        {fields.map((field, index) => {
          return (
            <section
              key={field.id}
              className="flex items-end justify-between w-full gap-2"
            >
              <Input
                label={`Option ${index + 1}`}
                type="text"
                {...register(`options.${index}.option` as const)}
                errMsg={errors.options?.[index]?.option?.message}
              />
              <button type="button" onClick={() => remove(index)}>
                <X height={50} size={30} />
              </button>
            </section>
          );
        })}
        <button type="button" onClick={() => append({ option: '' })}>
          ADD
        </button>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}
