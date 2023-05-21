/* This example requires Tailwind CSS v2.0+ */
import { cn } from '@/utils/cn';
import * as React from 'react';

export interface InputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { key: string; value: string }[];
  errMsg?: string;
}
const Item = ({
  optionKey,
  optionValue,
}: {
  optionKey: string;
  optionValue: string;
}) => {
  return <option value={optionKey}>{optionValue}</option>;
};
const Select = React.forwardRef<HTMLSelectElement, InputProps>(
  ({ className, options, label, errMsg, defaultValue, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={label} className="block mb-1 text-sm font-medium">
          {label}
        </label>
        <select
          id={label}
          name={label}
          className={cn(
            'bg-[#f9f9fa] text-[#49454F] dark:bg-[#27262b] dark:text-[#CAC4D0] border-none rounded-md px-4 py-2 w-full',
            className
          )}
          defaultValue={defaultValue}
          {...props}
          ref={ref}
        >
          {options.map((option) => {
            return (
              <Item
                key={option.key}
                optionKey={option.key}
                optionValue={option.value}
              />
            );
          })}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';
export { Select };
