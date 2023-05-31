'use client';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { FC, LinkHTMLAttributes, forwardRef } from 'react';

const menuItemVarients = cva('', {
  variants: {
    variant: {
      default:
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md text-onSurface dark:text-onSurfaceDark dark:hover:bg-slate-800 dark:hover:text-white ',
      subHeading:
        'flex items-center px-3 py-2 text-sm font-medium text-onSurface dark:text-onSurfaceDark rounded-md group dark:hover:text-white ',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface MenuItemProps
  extends LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof menuItemVarients> {
  name: string;
  href: string;
  current: boolean;
  role?: 'user' | 'admin' | 'mod';
}

const MenuItem: FC<MenuItemProps> = forwardRef<
  HTMLAnchorElement,
  MenuItemProps
>(({ className, current = false, variant, name, href, role = 'user' }, ref) => {
  const { auth } = useAuth() as { auth: any };
  if (auth.user.role !== role) {
    return null;
  }
  return (
    <>
      <Link
        href={href}
        className={cn(
          menuItemVarients({
            variant,
          }),
          current
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-600  hover:text-gray-900'
        )}
        ref={ref}
      >
        <span className="truncate">{name}</span>
      </Link>
    </>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
