'use client';

import Image from 'next/image';
import React from 'react';
import Paragraph from '../Paragraph';
import Button from '../Button';
import { Pencil, Trash } from 'lucide-react';
import DeleteQuestionModal from './DeleteQuestionModal';
import EditQuestionModal from './EditQuestionModal';
import { convertOptionsToFormOptions } from '@/helpers/questionConverter';

type QuestionProps = {
  id: number;
  text: string;
  fileSrc: string;
  number: number;
  options: string[];
  type: 'text' | 'file' | 'single-select' | 'multi-select';
};

export default function QuestionCard({
  id,
  text,
  fileSrc,
  number,
  type,
  options,
}: QuestionProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  return (
    <>
      <div
        key={id}
        className="flex flex-col justify-between p-4 rounded-md bg-surface dark:bg-surfaceDark"
      >
        {fileSrc ? (
          <Image
            src={fileSrc}
            alt="img"
            height={640}
            width={480}
            quality={80}
            className="rounded-md"
          ></Image>
        ) : null}
        <div className="flex flex-col justify-between">
          <Paragraph size="lg" className="font-bold ">
            {text}
          </Paragraph>

          <div className="flex items-end justify-end gap-4 mt-2 h-max md:flex-auto md:justify-start">
            <Button
              colorVarient="transparent"
              className="px-0 border-none rounded-full"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash className="mr-2" />
              Delete
            </Button>
            <Button
              colorVarient="secondary"
              className="rounded-full"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      <DeleteQuestionModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        id={id}
        index={number}
      />
      <EditQuestionModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        id={id}
        defaultValues={{
          text,
          file: fileSrc,
          options: convertOptionsToFormOptions(options),
          type,
        }}
      />
    </>
  );
}
