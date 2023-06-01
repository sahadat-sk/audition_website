import QuestionCard from '@/components/ui/question/QuestionCard';
import React from 'react';
import { getAllQuestions, getQuestionById } from '@/api/questionsApi';
import Image from 'next/image';

const Questions = async (props: any) => {
  const id = props.params.id;
  const question = await getQuestionById(id);
  console.log(question.text);
  return (
    <>
      <div className="px-4 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-flow-row grid-cols-1 gap-2 auto-rows-min "></div>
        <h2>{question.text}</h2>
        <Image
          src={question.file}
          alt="Question image"
          height={720}
          width={1280}
        />
      </div>
    </>
  );
};

export default Questions;
