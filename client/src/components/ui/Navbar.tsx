'use client';

import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import ThemeToogle from '../ThemeToogle';
import { cn } from '@/utils/cn';
import { XIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import Modal from './Modal';
import { useLogout } from '@/hooks/auth/useLogout';

function Avatar() {
  const { auth } = useAuth() as { auth: any };
  return (
    <img
      className="w-8 h-8 rounded-full"
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
        className="px-3 py-2 text-sm font-medium rounded-md hover:text-primary dark:hover:text-primaryDark"
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
        className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
      >
        {title}
      </Disclosure.Button>
    </>
  );
}

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const logout = useLogout();
  const { auth } = useAuth() as { auth: any };

  if (!auth?.user?.role) {
    return null;
  }
  return (
    <>
      <Disclosure
        as="nav"
        className="fixed w-screen bg-neutral-50 dark:bg-surfaceDark"
      >
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-2">
                    <img
                      className="block w-auto h-8 lg:hidden"
                      src="/images/gluglogo.png"
                      alt="Glug"
                    />
                    <img
                      className="hidden w-auto h-8 lg:block"
                      src="/images/gluglogo.png"
                      alt="Glug"
                    />
                  </div>

                  <Link href="/">
                    <h2 className="text-lg font-bold">Auditions</h2>
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
                        href="/questions"
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
                    <Menu as="div" className="relative ml-3">
                      <div className="ml-2">
                        <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
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
                        <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                              <button
                                className={cn(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => logout({})}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="flex -mr-2 sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
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
                  <div className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Toogle Theme</span>
                    <ThemeToogle />
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <Disclosure.Button
                    onClick={() => {
                      logout({});
                    }}
                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
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
