import QuestionCard from '@/components/ui/question/QuestionCard';
import React from 'react';
import { getAllQuestions } from '@/api/questionsApi';

const Questions = async () => {
  const data = await getAllQuestions();
  return (
    <>
      <div className="px-4 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-flow-row grid-cols-1 gap-2 auto-rows-min "></div>
        <h2>HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</h2>
      </div>
    </>
  );
};

export default Questions;
