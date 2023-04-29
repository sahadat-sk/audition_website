import { Open_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/utils/cn';
import Providers from '@/components/Providers';
import Navbar from '@/components/ui/Navbar';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const openSans = Open_Sans({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn('antialiased ', openSans.className)}>
      <body className="min-h-screen bg-bg dark:bg-bgDark">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
