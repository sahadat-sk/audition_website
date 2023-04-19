'use client';

import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

type Props = {};

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color disabled:opacity-50 disabled:pointer-events-none ',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-onPrimary dark:bg-primaryDark dark:text-onPrimaryDark',
        secondary:
          'bg-secondary text-onSecondary dark:bg-secondaryDark dark:text-onSecondaryDark',
        tertiary:
          'bg-tertiary text-onTertiary dark:bg-tertiaryDark dark:text-onTertiaryDark',
        blue: 'bg-blue text-onBlue dark:bg-blueDark dark:text-onBlueDark',
        red: 'bg-red text-onRed dark:bg-redDark dark:text-onRedDark',
        green: 'bg-green text-onGreen dark:bg-greenDark dark:text-onGreenDark',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-1',
        lg: 'h-11 px-8 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export default Button;
