import React from 'react';
import Paragraph from '../Paragraph';
import { Input } from '../input';
import { X } from 'lucide-react';
import Button from '../Button';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { FormSchemaType } from './AddQuestionModal';
import { cn } from '@/utils/cn';

type OptionsProps = {
  control: Control<FormSchemaType>;
  register: UseFormRegister<FormSchemaType>;
  errors: FieldErrors<FormSchemaType>;
  className?: string;
};

const Options = ({
  control,
  register,
  errors,
  className,
  ...props
}: OptionsProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  return (
    <div className={cn(className, 'flex gap-1 flex-col')} {...props}>
      <Paragraph className="mb-0 text-xs font-bold">Options</Paragraph>
      {fields.map((field, index) => {
        return (
          <section
            key={field.id}
            className="flex items-end justify-between w-full gap-2"
          >
            <Input
              // label={`Option ${index + 1}`}
              label={''}
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
      <Button
        colorVarient={'transparent'}
        type="button"
        className="mt-4"
        onClick={() => append({ option: '' })}
      >
        Add Option
      </Button>
    </div>
  );
};

export default Options;
