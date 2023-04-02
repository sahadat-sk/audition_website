import { createContext, useState } from 'react';

const AuthContext = createContext({});

export interface LayoutProps {
  children: React.ReactNode;
}

export const AuthProvider = (props: LayoutProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
