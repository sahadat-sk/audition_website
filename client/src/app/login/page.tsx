import { getGoogleUrl } from '@/utils/getGoogleUrl';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const Login = (props: Props) => {
  return (
    <div>
      <a href={getGoogleUrl('/login')}>Google Login</a>
    </div>
  );
};

export default Login;
