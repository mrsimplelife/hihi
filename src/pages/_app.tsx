import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { useStore } from '../app/store';
import styles from '../styles/Home.module.css';
import logo from '../../public/logo.svg';
import Image from 'next/image';

export default function MyApp({
  Component,
  pageProps: { initialReduxState, ...pageProps },
}: AppProps) {
  const store = useStore(initialReduxState);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Image src={logo} className={styles.logo} alt="logo" />
            <Component {...pageProps} />
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
      </PersistGate>
    </Provider>
  );
}
