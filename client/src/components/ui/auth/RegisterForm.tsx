import React from 'react';
import Card from '../Card';
import { Input } from '../input';
import Button from '../Button';
import Link from 'next/link';
import { getGoogleUrl } from '@/utils/getGoogleUrl';

type Props = {};

export default function RegisterForm({}: Props) {
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
      <div className="flex flex-col gap-2 ">
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Input label="Confirm Password" type="password" />
        <Button className="mt-2">Create Account</Button>
      </div>
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
