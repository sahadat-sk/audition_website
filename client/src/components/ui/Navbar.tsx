'use client';

import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import ThemeToogle from '../ThemeToogle';
import { cn } from '@/utils/cn';
import { XIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import Modal from './Modal';

function Avatar() {
  const { auth } = useAuth() as { auth: any };
  return (
    <img
      className="h-8 w-8 rounded-full"
      src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=%${auth.user.email}`}
      alt=""
    />
  );
}

function MenuItem({
  title,
  href,
  role = 'user',
}: {
  title: string;
  href: string;
  role?: 'user' | 'admin' | 'mod';
}) {
  const { auth } = useAuth() as { auth: any };
  if (auth.user.role !== role) {
    return null;
  }
  return (
    <>
      <Link
        href={`${href}`}
        className="hover:text-primary dark:hover:text-primaryDark px-3 py-2 rounded-md text-sm font-medium"
      >
        {title}
      </Link>
    </>
  );
}

function MobileMenuItem({
  title,
  href,
  role = 'user',
}: {
  title: string;
  href: string;
  role?: 'user' | 'admin' | 'mod';
}) {
  const { auth } = useAuth() as { auth: any };
  if (auth.user.role !== role) {
    return null;
  }
  return (
    <>
      <Disclosure.Button
        as="a"
        href={`${href}`}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
      >
        {title}
      </Disclosure.Button>
    </>
  );
}

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { auth } = useAuth() as { auth: any };

  if (!auth.user.role) {
    return null;
  }
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-surface dark:bg-surfaceDark fixed w-screen"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-2">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="/images/gluglogo.png"
                      alt="Glug"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="/images/gluglogo.png"
                      alt="Glug"
                    />
                  </div>

                  <Link href="/">
                    <h2 className="font-bold text-lg">Auditions</h2>
                  </Link>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <MenuItem
                        title="Admin Dashboard"
                        href="/dashboard"
                        role="user"
                      />
                      <MenuItem
                        title="Manage Players"
                        href="/team"
                        role="admin"
                      />
                      <MenuItem
                        title="Questions"
                        href="/auditions"
                        role="user"
                      />
                      <MenuItem
                        title="Manage Questions"
                        href="/questions"
                        role="admin"
                      />
                      <MenuItem title="Rules" href="/auditions" role="user" />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center">
                    <div>
                      <span className="sr-only">Theme Toogle</span>
                      <ThemeToogle />
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div className="ml-2">
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Avatar />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={cn(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => setModalOpen(true)}
                              >
                                Your Profile
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={cn(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <MobileMenuItem title="Admin Dashboard" href="/" role="admin" />
                <MobileMenuItem
                  title="Manage Players"
                  href="/team"
                  role="admin"
                />
                <MobileMenuItem
                  title="Questions"
                  href="/auditions"
                  role="user"
                />
                <MobileMenuItem
                  title="Manage Questions"
                  href="/questions"
                  role="admin"
                />
                <MobileMenuItem title="Rules" href="/auditions" role="user" />
              </div>
              <div className="pt-4 pb-3 border-t border-outline">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {auth.user?.username}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {auth.user?.email}
                    </div>
                  </div>
                  <div className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Toogle Theme</span>
                    <ThemeToogle />
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <p>username :{auth.user?.username}</p>
      </Modal>
    </>
  );
}
