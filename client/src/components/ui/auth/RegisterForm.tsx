'use client';

import React from 'react';
import Card from '../Card';
import { Input } from '../input';
import Button from '../Button';
import Link from 'next/link';
import { getGoogleUrl } from '@/utils/getGoogleUrl';
import { useRegister } from '@/hooks/auth/useRegister';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(20),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: z
      .string()
      .min(1, 'Confirm Password is required')
      .min(6, 'Confirm Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  });

type FormSchemaType = z.infer<typeof formSchema>;

type Props = {};

export default function RegisterForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const registerFn = useRegister();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    registerFn(data);
  };

  // const demoSubmit = (e: any) => {
  //   e.preventDefault();
  //   const dummy = {
  //     username: 'dummy',
  //     email: 'rentu1970@gmail.com',
  //     password: '123456',
  //     passwordConfirmation: '123456',
  //   };
  //   // registerFn(dummy);
  //   toast('Demo account created successfully');
  // };

  return (
    <Card
      heading="Sign Up"
      subheading={
        <>
          Already have an account?{' '}
          <Link
            className="underline text-blue dark:text-blueDark"
            href="/login"
          >
            Login
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          type="text"
          {...register('username')}
          errMsg={errors.username?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          errMsg={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          errMsg={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register('passwordConfirmation')}
          errMsg={errors.passwordConfirmation?.message}
        />
        <Button type="submit" className="mt-2">
          Create Account
        </Button>
      </form>
      {/* <Button onClick={demoSubmit} className="mt-2">
        Create Demo Account
      </Button> */}
      <div className="flex flex-col items-center gap-2 mt-2">
        <span className="text-sm text-outline">Or</span>
        <a href={getGoogleUrl('/login')} className="w-full">
          <Button
            className="w-full"
            colorVarient="transparent"
            disabled={isSubmitting}
          >
            <img src="/icons/google.svg" className="h-[32px] mr-2"></img>
            Continue with Google
          </Button>
        </a>
      </div>
    </Card>
  );
}
