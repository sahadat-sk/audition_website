'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
export default function Example() {
  const [enabled, setEnabled] = useState(false);
  const { setTheme } = useTheme();
  useEffect(() => {
    if (enabled) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        enabled ? 'bg-bgDark' : 'bg-bg',
        'relative inline-flex flex-shrink-0 p-1  w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 '
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={cn(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={cn(
            enabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <Sun />
        </span>
        <span
          className={cn(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity '
          )}
          aria-hidden="true"
        >
          <Moon />
        </span>
      </span>
    </Switch>
  );
}
