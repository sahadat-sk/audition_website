import React from 'react';
import { getQuestionById } from '@/api/questionsApi';
import Image from 'next/image';
import LargeHeading from '@/components/ui/LargeHeading';
import { AnswerSection } from '@/components/ui/answer/AnswerSection';

const Questions = async (props: any) => {
  const id = props.params.id;
  const questionPromise = getQuestionById(id);
  const question = await questionPromise;
  return (
    <>
      <div className="w-full h-screen px-4 pt-10 mx-auto overflow-auto max-w-7xl sm:px-6 lg:px-8 bg-surface dark:bg-surfaceDark">
        <LargeHeading size={'sm'} className="mb-4">
          {question.text}
        </LargeHeading>
        {question?.file ? (
          <Image
            src={question.file}
            alt="question image"
            height={720}
            width={1280}
          />
        ) : null}
        <AnswerSection type={question.type} options={question.options} />
      </div>
    </>
  );
};

export default Questions;
