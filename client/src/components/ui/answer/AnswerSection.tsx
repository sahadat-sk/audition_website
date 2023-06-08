import { TextArea } from '../TextArea';
import SelectOptions from './SelectOptions';

interface AnswerSectionProps {
  type: 'text' | 'file' | 'single-select' | 'multi-select';
  options: string[];
}

export const AnswerSection = ({ type, options }: AnswerSectionProps) => {
  if (type === 'text') {
    return (
      <>
        <TextArea className="mb-20" placeholder="Write your answer here..." />
      </>
    );
  }
  if (type == 'single-select' || type === 'multi-select') {
    return (
      <>
        <SelectOptions options={options} type={type} />
      </>
    );
  }
  return <p>KONO KAJER NA</p>;
};
