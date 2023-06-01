'use client';
import { cn } from '@/utils/cn';
import { X, Menu } from 'lucide-react';
import { ReactNode, useState } from 'react';
import Button from './ui/Button';

export const SidebarToogle = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          'w-[15rem] absolute md:static',
          open ? 'bg-surface dark:bg-surfaceDark' : ''
        )}
      >
        <Button
          colorVarient={'transparent'}
          onClick={() => setOpen(true)}
          className={cn(open ? 'hidden' : 'block border-none', 'md:hidden')}
        >
          <Menu />
        </Button>
        <div className={cn(open ? 'block' : 'hidden md:block', 'w-[15rem]')}>
          <Button
            onClick={() => setOpen(false)}
            className="border-none md:hidden"
            colorVarient={'transparent'}
          >
            <X />
          </Button>
          {children}
        </div>
      </div>
    </>
  );
};
