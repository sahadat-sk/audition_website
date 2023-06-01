import Button from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-8 px-4 mx-auto md:gap-0 md:flex-row md:justify-between max-w-7xl sm:px-6 lg:px-8">
        <div className="relative w-full md:w-2/3">
          <img
            src="/images/hero.svg"
            className="invert dark:invert-0 "
            alt="hero"
          ></img>
        </div>
        <div className="flex flex-col items-center gap-2 md:w-1/3">
          <LargeHeading>Welcome!</LargeHeading>
          <Paragraph className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet
          </Paragraph>
          <Link href="/register">
            <Button>Begin your journey</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
