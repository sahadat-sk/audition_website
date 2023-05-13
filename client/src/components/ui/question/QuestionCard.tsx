'use client';

import Image from 'next/image';
import React from 'react';
import Paragraph from '../Paragraph';

type QuestionProps = {
  id: number;
  text: string;
  fileSrc: string;
};

export default function QuestionCard({ id, text, fileSrc }: QuestionProps) {
  return (
    <>
      <div key={id} className="bg-surface dark:bg-surfaceDark p-4 rounded-md ">
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
      </div>
    </>
  );
}
