'use client';

import { getAllQuestions } from '@/api/questionsApi';
import MenuItem from './MenuItem';
import { questionsToSidebarLinks } from '@/helpers/questionConverter';
import { useEffect, useState } from 'react';

export const AllQuestionsList = () => {
  const [questions, setQuestions] = useState<{ name: string; href: string }[]>(
    []
  );

  useEffect(() => {
    getAllQuestions().then((data) => {
      const secondaryNavigation = questionsToSidebarLinks(data.data.questions);
      setQuestions(secondaryNavigation);
    });
  }, []);

  return (
    <div
      className="space-y-1 overflow-auto"
      role="group"
      aria-labelledby="projects-headline"
    >
      {questions?.map((item: { name: string; href: string }) => (
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
