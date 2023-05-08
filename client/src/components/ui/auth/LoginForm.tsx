'use client';
import React from 'react';
import Card from '../Card';
import { Input } from '../input';
import Button from '../Button';
import Link from 'next/link';
import { getGoogleUrl } from '@/utils/getGoogleUrl';
import { useLogin } from '@/hooks/auth/useLogin';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;
type Props = {};

export default function LoginForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const loginFn = useLogin();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    loginFn(data);
  };

  return (
    <Card
      heading="Sign in"
      subheading={
        <>
          Don't have an account?{' '}
          <Link
            className="underline text-blue dark:text-blueDark"
            href="/register"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-2 " onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" disabled={isSubmitting} className="mt-2">
          Sign in
        </Button>
      </form>
      <div className="flex flex-col items-center gap-2 mt-2">
        <span className="text-sm text-outline">Or</span>
        <a href={getGoogleUrl('/login')} className="w-full">
          <Button className="w-full" colorVarient="transparent">
            <img src="/icons/google.svg" className="h-[32px] mr-2"></img>
            Continue with Google
          </Button>
        </a>
      </div>
    </Card>
  );
}
