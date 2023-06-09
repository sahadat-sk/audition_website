import SelectOptions from './SelectOptions';
import TextAnswer from './TextAnswer';

interface AnswerSectionProps {
  type: 'text' | 'file' | 'single-select' | 'multi-select';
  options: string[];
}

export const AnswerSection = ({ type, options }: AnswerSectionProps) => {
  if (type === 'text') {
    return <TextAnswer />;
  }
  if (type == 'single-select' || type === 'multi-select') {
    return <SelectOptions options={options} type={type} />;
  }
  return <p>KONO KAJER NA</p>;
};
