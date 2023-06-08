import { cn } from '@/utils/cn';
import * as React from 'react';

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'bg-[#f9f9fa] text-[#49454F] dark:bg-[#27262b] dark:text-[#CAC4D0] border-none rounded-md px-4 py-2 w-full outline-none focus:outline-outline',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextArea.displayName = 'Input';

export { TextArea };
