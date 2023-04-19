import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, forwardRef } from 'react';

const headingVariants = cva(
  'text-onBg dark:text-onBgDark text-center lg:text-left font-bold leading-tight tracking-tight',
  {
    variants: {
      size: {
        default: 'text-4xl md:text-5xl lg:text-6xl',
        sm: 'text-2xl md:text-3xl lg:text-4xl',
        lg: 'text-5xl md:text-6xl lg:text-7xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const LargeHeading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(headingVariants({ size, className }))}
      >
        {children}
      </h1>
    );
  }
);

LargeHeading.displayName = 'Heading';

export default LargeHeading;
