type Answer = {
  text?: string;
  questionId: string;
  file?: any;
  selectedOptions?: string[];
};

export const convertAnswerToFormData = (answer: Answer) => {
  let answerFormData = new FormData();
  if (answer.text) answerFormData.append('text', answer.text);

  answerFormData.append(
    'selectedOptions',
    JSON.stringify(answer.selectedOptions)
  );
  if (answer.file && answer.file[0]) {
    answerFormData.append('file', answer.file[0]);
  }

  answerFormData.append('questionId', answer.questionId);
  return answerFormData;
};
