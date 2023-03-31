import { getGoogleUrl } from '@/utils/getGoogleUrl';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  let from = router.asPath || '/';

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{}</div>
        <Link href={getGoogleUrl(from)}>Google Login</Link>
      </main>
    </>
  );
}
