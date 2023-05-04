import { cn } from '@/utils/cn';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div>
        <label htmlFor="email" className="block  text-sm font-medium mb-1">
          {label}
        </label>
        <input
          type={type}
          className={cn(
            'bg-[#f9f9fa] text-[#49454F] dark:bg-[#27262b] dark:text-[#CAC4D0] border-none rounded-md px-4 py-2 w-full',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
