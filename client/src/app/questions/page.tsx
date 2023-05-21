'use client';

import Button from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import QuestionCard from '@/components/ui/question/QuestionCard';
import AddQuestionModal from '@/components/ui/question/AddQuestionModal';
import { useGetAllQuestions } from '@/hooks/questions/useQuestions';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {};

const Questions = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const { data } = useGetAllQuestions();
  return (
    <>
      <div className="px-4 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between w-full gap-2 p-4 mb-4 rounded-md bg-surface dark:bg-surfaceDark lg:flex-row">
          <LargeHeading size="sm">All Questions</LargeHeading>
          <Button onClick={handleAddClick}>
            Add Question <Plus className="ml-2" />
          </Button>
        </div>
        <div className="grid grid-flow-row grid-cols-1 gap-2 auto-rows-min md:grid-cols-3">
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
      <AddQuestionModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

export default Questions;
