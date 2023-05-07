'use client';

import { ReactNode } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        toastClassName={'bg-red dark:bg-redDark text-onRed dark:text-onRedDark'}
        icon={''}
      />
    </>
  );
}
