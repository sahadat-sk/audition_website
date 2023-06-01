import Image from 'next/image';
import MenuItem from './MenuItem';
import ThemeToogle from '../ThemeToogle';
import { AllQuestionsList } from './AllQuestionsList';
import HideWhenLoggedOut from '../HideWhenLogedOut';
import { Suspense, useState } from 'react';
import { SidebarToogle } from '../SideBarToogle';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Questions', href: '/questions-admin', current: false },
  { name: 'Users', href: '#', current: false },
  { name: 'Quiz', href: '#', current: false },
];

export default function SideBarNav() {
  return (
    <HideWhenLoggedOut>
      <SidebarToogle>
        <div className="absolute md:static flex flex-col pt-1 md:pt-5 pb-4 overflow-y-auto   bg-surface dark:bg-surfaceDark w-[15rem] h-screen ">
          <div className="flex items-center justify-between px-4">
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
                {/* @ts-expect-error Async Server Component */}
                <AllQuestionsList />
              </div>
            </nav>
          </div>
        </div>
      </SidebarToogle>
    </HideWhenLoggedOut>
  );
}
