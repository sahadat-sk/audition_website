import { ReactNode } from 'react';
import Paragraph from './Paragraph';
import Link from 'next/link';

interface CardProps {
  heading: string;
  children: ReactNode;
  subheading?: ReactNode;
}

export default function Card({ heading, subheading, children }: CardProps) {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center rounded-sm  sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-onSurface dark:text-onSurfaceDark mt-6 text-center text-3xl font-extrabold text-gray-900">
            {heading}
          </h2>
        </div>
        <Paragraph size="sm" className="text-center mt-2">
          {subheading}
        </Paragraph>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-surface dark:bg-surfaceDark rounded-sm ">
          <div className="bg- py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
