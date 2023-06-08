import { cn } from '@/utils/cn';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errMsg?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, errMsg, ...props }, ref) => {
    return (
      <div className="w-full">
        <label htmlFor={label} className="block mb-1 text-sm font-medium">
          {label}
        </label>
        <input
          type={type}
          className={cn(
            'bg-[#f9f9fa] text-[#49454F] dark:bg-[#27262b] dark:text-[#CAC4D0] border-none rounded-md px-4 py-2 w-full outline-none focus:outline-outline',
            className
          )}
          ref={ref}
          {...props}
        />
        {errMsg && errMsg.length > 0 ? (
          <p className="text-sm text-red dark:text-redDark">{errMsg}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
