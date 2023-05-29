/* This example requires Tailwind CSS v2.0+ */

import { cn } from '@/utils/cn';
import Image from 'next/image';
import MenuItem from './MenuItem';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Questions', href: '/questions', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Documents', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const secondaryNavigation = [
  { name: 'Website redesign', href: '#' },
  { name: 'GraphQL API', href: '#' },
  { name: 'Customer migration guides', href: '#' },
  { name: 'Profit sharing program', href: '#' },
];

export default function SideBarNav() {
  return (
    <div className="flex flex-col pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200 w-[20rem]">
      <div className="flex items-center px-4">
        <Image
          height={32}
          width={32}
          className="block w-auto h-8 "
          src="/images/gluglogo.png"
          alt="Glug"
          quality={100}
        />{' '}
        {/* For LOGO */}
      </div>
      <div className="flex flex-col flex-grow mt-5">
        <nav className="flex-1 px-2 space-y-8 bg-white" aria-label="Sidebar">
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
              Projects
            </h3>
            <div
              className="space-y-1"
              role="group"
              aria-labelledby="projects-headline"
            >
              {secondaryNavigation.map((item) => (
                <MenuItem
                  key={item.name}
                  current={false}
                  name={item.name}
                  href={item.href}
                  variant={'subHeading'}
                />
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
