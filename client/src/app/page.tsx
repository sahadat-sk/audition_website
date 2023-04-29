import Button from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen">
      <div className="flex flex-col gap-8 md:gap-0   md:flex-row items-center justify-center md:justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full md:w-2/3">
          <img
            src="/images/hero.svg"
            className="invert dark:invert-0 "
            alt="hero"
          ></img>
        </div>
        <div className="flex flex-col gap-2 items-center md:w-1/3">
          <LargeHeading>Welcome!</LargeHeading>
          <Paragraph className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet
          </Paragraph>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
