'use client';

import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Button from '@/components/ui/Button';

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <main>
      <div>
        <LargeHeading size="sm">{theme}</LargeHeading>
        <Paragraph>Baltai</Paragraph>
        <Button onClick={() => setTheme('light')}>light</Button>
        <Button onClick={() => setTheme('dark')}>dark</Button>
        <div className="relative w-1/3 h-full">
          <Image fill src="/images/hero.svg" alt="hero"></Image>
        </div>
      </div>
    </main>
  );
}
