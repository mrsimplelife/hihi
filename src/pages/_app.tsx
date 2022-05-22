import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { useStore } from '../app/store';

export default function MyApp({
  Component,
  pageProps: { initialReduxState, ...pageProps },
}: AppProps) {
  const store = useStore(initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
