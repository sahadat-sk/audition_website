import QuestionCard from '@/components/ui/question/QuestionCard';
import React, { Suspense } from 'react';
import { getAllQuestions } from '@/api/questionsApi';
import AddQuestion from '@/components/ui/AddQuestion';

type Props = {};

const Questions = async (props: Props) => {
  const data = await getAllQuestions();
  return (
    <>
      <div className="w-full h-screen px-4 pt-6 mx-auto overflow-auto sm:px-6 lg:px-8">
        <AddQuestion />
        <div className="grid grid-flow-row grid-cols-1 gap-2 auto-rows-min ">
          {data?.data?.questions.map((question: any, index: number) => (
            <QuestionCard
              number={index + 1}
              key={question._id}
              id={question._id}
              text={question.text}
              fileSrc={question.file}
              options={question.options}
              type={question.type}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
