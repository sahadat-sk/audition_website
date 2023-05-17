import React from 'react';
import Modal from '../Modal';
import LargeHeading from '../LargeHeading';
import Paragraph from '../Paragraph';
import Button from '../Button';
import { useDeleteQuestion } from '@/hooks/questions/useQuestions';

type Props = {
  id: number;
  open: boolean;
  setOpen: any;
  index: number;
};

function DeleteQuestionModal({ open, setOpen, id, index }: Props) {
  const { deleteQuestionMutation: deleteQuestion } = useDeleteQuestion();
  const handleDelete = () => {
    deleteQuestion(id);
    setOpen(false);
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <LargeHeading size={'sm'} className="mb-4">
        Delete Question?
      </LargeHeading>
      <Paragraph size={'sm'}>
        Are you sure you want to delete <b>question number {index}?</b> This
        action
        <b> cannot be undone.</b>
      </Paragraph>
      <div className="flex gap-2 mt-4">
        <Button colorVarient={'red'} onClick={handleDelete}>
          Delete
        </Button>
        <Button colorVarient={'transparent'} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteQuestionModal;
