'use client';
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export interface LayoutProps {
  children: React.ReactNode;
}

export interface Auth {
  accessToken?: string;
  user?: any;
}

export const AuthProvider = (props: LayoutProps) => {
  const [auth, setAuth] = useState<Auth>({
    accessToken: '',
    user: {},
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
