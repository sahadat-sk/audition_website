import SelectOptions from './SelectOptions';
import TextAnswer from './TextAnswer';
import UploadFileSection from './UploadFileSection';

interface AnswerSectionProps {
  type: 'text' | 'file' | 'single-select' | 'multi-select';
  options: string[];
  questionId: number;
}

export const AnswerSection = ({
  questionId,
  type,
  options,
}: AnswerSectionProps) => {
  if (type === 'text') {
    return <TextAnswer questionId={questionId} />;
  }
  if (type == 'single-select' || type === 'multi-select') {
    return (
      <SelectOptions questionId={questionId} options={options} type={type} />
    );
  }
  return <UploadFileSection questionId={questionId} />;
};
