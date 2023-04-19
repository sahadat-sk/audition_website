'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
