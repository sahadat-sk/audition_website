'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
export default function ThemeToogle() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState<boolean>();
  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button onClick={handleThemeChange}>
      {theme === 'light' ? (
        <Sun className={cn('w-6 h-6')} />
      ) : (
        <Moon className={cn('w-6 h-6')} />
      )}
    </button>
  );
}
