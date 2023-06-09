import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, forwardRef } from 'react';

const paragraphVariants = cva(
  'max-w-prose text-onBg dark:text-onBgDark mb-2 ',
  {
    variants: {
      size: {
        default: 'text-base sm:text-lg',
        sm: 'text-sm sm:text-base',
        lg: 'text-lg sm:text-xl',
        xs: 'text-xs sm:text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(paragraphVariants({ size, className }))}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
