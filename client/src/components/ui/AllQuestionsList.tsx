import { getAllQuestions } from '@/api/questionsApi';
import MenuItem from './MenuItem';
import { questionsToSidebarLinks } from '@/helpers/questionConverter';

export const AllQuestionsList = async () => {
  const data = await getAllQuestions();
  const secondaryNavigation = questionsToSidebarLinks(data.data.questions);
  return (
    <div
      className="space-y-1 overflow-auto"
      role="group"
      aria-labelledby="projects-headline"
    >
      {secondaryNavigation.map((item: { name: string; href: string }) => (
        <MenuItem
          key={item.name}
          current={false}
          name={item.name}
          href={item.href}
          variant={'subHeading'}
        />
      ))}
    </div>
  );
};
