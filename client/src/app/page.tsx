import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <div>
        <div></div>
        <Image src="/images/hero.svg" alt="hero" quality={100}></Image>
      </div>
    </main>
  );
}
