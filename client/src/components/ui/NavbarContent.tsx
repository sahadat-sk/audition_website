import Image from 'next/image';
import ThemeToogle from '../ThemeToogle';
import { AllQuestionsList } from './AllQuestionsList';
import { cn } from '@/utils/cn';
import MenuItem from './MenuItem';
const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Questions', href: '/questions-admin', current: false },
  { name: 'Users', href: '#', current: false },
  { name: 'Quiz', href: '#', current: false },
];

const NavbarContent = ({ mobile = false }: { mobile: boolean }) => {
  return (
    <div className={cn(mobile ? '' : 'hidden lg:block')}>
      <div className={cn('flex items-center justify-between px-4')}>
        <Image
          height={32}
          width={32}
          className="block w-auto h-8 "
          src="/images/gluglogo.png"
          alt="Glug"
          quality={100}
        />{' '}
        <ThemeToogle />
        {/* For LOGO */}
      </div>
      <div className="flex flex-col flex-grow mt-5">
        <nav
          className="flex-1 px-2 space-y-8 bg-surface dark:bg-surfaceDark "
          aria-label="Sidebar"
        >
          <div className="space-y-1">
            {navigation.map((item) => (
              <MenuItem
                key={item.name}
                current={false}
                name={item.name}
                href={item.href}
              />
            ))}
          </div>
          <div className="space-y-1">
            <h3
              className="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase"
              id="projects-headline"
            >
              Questions
            </h3>
            <AllQuestionsList />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarContent;
