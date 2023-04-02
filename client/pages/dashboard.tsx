import Head from 'next/head';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
export default function Login() {
  const axios = useAxiosPrivate();
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>hello</h1>
        <button onClick={handleLogout}>logout</button>
      </main>
    </>
  );
}
