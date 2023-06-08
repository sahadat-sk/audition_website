'use client';
import React from 'react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const SingleOptionSelectSchema = z.object({
  selectedOptions: z
    .array(z.string())
    .min(1, 'Option Required')
    .max(1, 'Select only one'),
});
export const MultiOptionSelectSchema = z.object({
  selectedOptions: z.array(z.string()).min(1, 'Option Required'),
});
export type SingleSelectType = z.infer<typeof SingleOptionSelectSchema>;
export type MultiSelectType = z.infer<typeof MultiOptionSelectSchema>;

interface SelectOptionsProps {
  options: string[];
  type: 'single-select' | 'multi-select';
}

export default function SelectOptions({ options, type }: SelectOptionsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MultiSelectType | SingleSelectType>({
    resolver: zodResolver(
      type === 'multi-select'
        ? MultiOptionSelectSchema
        : SingleOptionSelectSchema
    ),
  });
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  return (
    <fieldset>
      <legend className="text-lg font-medium ">Options</legend>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 ">
          {options.map((option, optionIdx) => (
            <div key={optionIdx} className="relative flex items-start py-1">
              <div className="flex-1 min-w-0 text-sm">
                <label
                  htmlFor={`option-${optionIdx}`}
                  className="font-medium select-none text-onSurface dark:text-onSurfaceDark"
                >
                  {option}
                </label>
              </div>
              <div className="flex items-center h-5 ml-3">
                <input
                  id={`option-${optionIdx}`}
                  // name={`options`}
                  value={option}
                  type="checkbox"
                  {...register('selectedOptions')}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
        <p>{errors.selectedOptions?.message}</p>
        <button type="submit">submit</button>
      </form>
    </fieldset>
  );
}