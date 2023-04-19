import ThemeToogle from '@/components/ThemeToogle';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div>
        <LargeHeading size="sm">hii</LargeHeading>
        <Paragraph>Baltai</Paragraph>
        <ThemeToogle />
        <div className="relative w-1/3 h-full">
          <Image fill src="/images/hero.svg" alt="hero"></Image>
        </div>
      </div>
    </main>
  );
}
