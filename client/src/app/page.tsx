import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className="flex dark:text-onBgDark  justify-between items-center ">
        <LargeHeading size="lg">Welcome to glug auditions</LargeHeading>
        <div className="relative w-1/3 h-full">
          <Image fill src="/images/hero.svg" alt="hero"></Image>
        </div>
      </div>
    </main>
  );
}
