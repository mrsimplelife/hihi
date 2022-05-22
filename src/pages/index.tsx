import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/counter">
        <a>counter</a>
      </Link>
      <Link href="/persist">
        <a>persist</a>
      </Link>
    </>
  );
};

export default IndexPage;
