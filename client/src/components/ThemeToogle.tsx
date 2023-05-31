'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
export default function ThemeToogle() {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={handleThemeChange}
      className="flex items-center justify-center"
    >
      {theme && theme === 'light' ? (
        <Sun className={cn('w-6 h-6')} />
      ) : (
        <Moon className={cn('w-6 h-6')} />
      )}
    </button>
  );
}
