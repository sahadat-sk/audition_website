'use client';
import React from 'react';
import LargeHeading from './LargeHeading';
import Button from './Button';
import { Plus } from 'lucide-react';
import AddQuestionModal from './question/AddQuestionModal';

const AddQuestion = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-2 p-4 mb-4 rounded-md bg-surface dark:bg-surfaceDark lg:flex-row">
        <LargeHeading size="sm">All Questions</LargeHeading>
        <Button onClick={handleAddClick}>
          Add Question <Plus className="ml-2" />
        </Button>
      </div>
      <AddQuestionModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

export default AddQuestion;
