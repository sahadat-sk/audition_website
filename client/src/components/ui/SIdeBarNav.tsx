'use client';

import HideWhenLoggedOut from '../HideWhenLogedOut';
import SlideOver from './SlideOver';
import { MenuIcon } from 'lucide-react';
import NavbarContent from './NavbarContent';
import { useState } from 'react';
import Button from './Button';

export default function SideBarNav() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <HideWhenLoggedOut>
      <div className="absolute top-0 w-screen bg-surface dark:bg-surfaceDark">
        <Button
          type="button"
          colorVarient={'transparent'}
          className="px-4 border-none top-2 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </Button>
      </div>
      <div className="absolute hidden md:block md:static flex flex-col pt-1 md:pt-5 pb-4 overflow-y-auto   bg-surface dark:bg-surfaceDark w-[15rem] h-screen ">
        <SlideOver sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <NavbarContent mobile />
        </SlideOver>
        <NavbarContent mobile={false} />
      </div>
    </HideWhenLoggedOut>
  );
}
