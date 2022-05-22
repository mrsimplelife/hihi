import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { initializeStore } from '../app/store';
import Examples from '../components/example';
import Counter from '../features/counter/Counter';
import {
  serverRenderClock,
  startClock,
} from '../features/persist/persistSlice';
import styles from '../styles/Home.module.css';
import logo from '../../public/logo.svg';

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setInterval(() => dispatch(startClock()), 1000);
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <Counter />
        <br />
        <Examples />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const store = initializeStore();
  store.dispatch(serverRenderClock());
  return {
    props: { initialReduxState: store.getState() },
  };
}
