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
};

export default function QuestionCard({ id, text, fileSrc }: QuestionProps) {
  return (
    <>
      <div key={id} className="p-4 rounded-md bg-surface dark:bg-surfaceDark ">
        <Paragraph size="lg" className="font-bold">
          {text}
        </Paragraph>
        <Image
          src={fileSrc}
          alt="img"
          height={640}
          width={480}
          quality={80}
          className="rounded-md"
        ></Image>
        <div className="flex gap-2 mt-4">
          <Button colorVarient="blue">
            <Pencil className="mr-2" />
            Edit
          </Button>
          <Button colorVarient="red">
            <Trash className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
