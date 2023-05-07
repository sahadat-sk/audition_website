import RegisterForm from '@/components/ui/auth/RegisterForm';
import React from 'react';

const Register = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col gap-8 md:gap-0   md:flex-row items-center justify-center md:justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block relative w-full md:w-2/3">
          <img
            src="/images/hero.svg"
            className="invert dark:invert-0 "
            alt="hero"
          ></img>
        </div>

        <div className="flex flex-col gap-2 items-center md:w-1/3">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
