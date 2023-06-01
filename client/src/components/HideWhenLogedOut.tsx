'use client';

import useAuth from '@/hooks/useAuth';
import { ReactNode } from 'react';

const HideWhenLoggedOut = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth() as {
    auth: any;
  };

  if (!auth?.user?.email) return null;

  return <>{children}</>;
};
export default HideWhenLoggedOut;
