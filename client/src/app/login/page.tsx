import LoginForm from '@/components/ui/auth/LoginForm';
import React from 'react';

const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-8 px-4 mx-auto md:gap-0 md:flex-row md:justify-between max-w-7xl sm:px-6 lg:px-8">
        <div className="relative hidden w-full lg:block md:w-2/3">
          <img
            src="/images/hero.svg"
            className="invert dark:invert-0 "
            alt="hero"
          ></img>
        </div>

        <div className="flex flex-col items-center gap-2 md:w-1/3">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
