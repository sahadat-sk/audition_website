'use client';

import { ReactNode } from 'react';
import { ToastContainer, Zoom, ToastClassName } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: ReactNode;
};

const contextClass = {
  success: 'bg-green text-onGreen dark:bg-greenDark dark:text-onGreenDark',
  error: 'bg-red text-onRed dark:bg-redDark dark:text-onRedDark',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-bg text-onBg dark:bg-bgDark dark:text-onBgDark',
};

export default function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        toastClassName={(type) =>
          contextClass[type?.type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        icon={''}
      />
    </>
  );
}
