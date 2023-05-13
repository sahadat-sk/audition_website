'use client';

import Button from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import QuestionCard from '@/components/ui/question/QuestionCard';
import { useGetAllQuestions } from '@/hooks/questions/useQuestions';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {};

const Questions = (props: Props) => {
  const { data } = useGetAllQuestions();
  return (
    <>
      <div className="px-4 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between w-full gap-2 p-4 mb-4 rounded-md bg-surface dark:bg-surfaceDark lg:flex-row">
          <LargeHeading size="sm">All Questions</LargeHeading>
          <Button>
            Add Question <Plus className="ml-2" />
          </Button>
        </div>
        {data?.data?.questions.map((question: any) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            text={question.text}
            fileSrc={question.file}
          />
        ))}
      </div>
    </>
  );
};

export default Questions;
