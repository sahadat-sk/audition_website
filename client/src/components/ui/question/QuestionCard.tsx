'use client';

import Image from 'next/image';
import React from 'react';
import Paragraph from '../Paragraph';
import Button from '../Button';
import { Pencil, Trash } from 'lucide-react';

type QuestionProps = {
  id: number;
  text: string;
  fileSrc: string;
  number: number;
};

export default function QuestionCard({
  id,
  text,
  fileSrc,
  number,
}: QuestionProps) {
  return (
    <>
      <div key={id} className="p-4 rounded-md bg-surface dark:bg-surfaceDark ">
        <div className="flex items-center gap-2 ">
          <p className="flex items-center justify-center w-6 h-6 p-2 font-bold rounded-full bg-primary text-onPrimary dark:bg-primaryDark dark:text-onPrimaryDark">
            {number}
          </p>
          <Paragraph size="lg" className="mb-0 font-bold">
            {text}
          </Paragraph>
        </div>
        {fileSrc ? (
          <Image
            src={fileSrc}
            alt="img"
            height={640}
            width={480}
            quality={80}
            className="mt-4 rounded-md"
          ></Image>
        ) : null}
        <div className="flex justify-center flex-1 gap-2 mt-4 md:flex-auto md:justify-end">
          <Button
            colorVarient="transparent"
            className="w-full text-blue dark:text-blueDark border-blue dark:border-blueDark md:w-auto"
          >
            <Pencil className="mr-2" />
            Edit
          </Button>
          <Button
            colorVarient="transparent"
            className="w-full text-red dark:text-redDark border-red dark:border-redDark md:w-auto"
          >
            <Trash className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
