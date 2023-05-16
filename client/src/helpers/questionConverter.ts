// {
//   "text": "what is the question",
//   "options": [
//     {
//       "option": "there are"
//     },
//     {
//       "option": "the one"
//     },
//     {
//       "option": "the wot"
//     },
//     {
//       "option": "alsfdkjl"
//     }
//   ],
//   "file": {
//     "0": {}
//   },
//   "type": "text"
// }
export const convertQuestionToFormData = (question: any) => {
  let questionFormData = new FormData();
  questionFormData.append('text', question.text);
  questionFormData.append('type', question.type);
  questionFormData.append(
    'options',
    JSON.stringify(convertOptionsArray(question.options))
  );
  if (question.file && question.file[0]) {
    questionFormData.append('file', question.file[0]);
  }
  return questionFormData;
};
export const convertOptionsArray = (options: any) => {
  let optionsArray: string[] = [];
  options.forEach((option: any) => {
    optionsArray.push(option.option);
  });
  return optionsArray;
};
