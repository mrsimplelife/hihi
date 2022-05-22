import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { counterSlice } from '../features/counter/counterSlice';
import { persistSlice } from '../features/persist/persistSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { useMemo } from 'react';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'primary',
  storage,
  version: 1,
  whitelist: ['exampleData'], // 유지하려는 상태를 선택하는 위치
};

const persistedReducer = persistReducer(persistConfig, persistSlice.reducer);

export const makeStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      persist: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  });
};

let store: OptionalStore;

export const initializeStore = (preloadedState?: AppState) => {
  let _store = store ?? makeStore(preloadedState);

  // 초기 Redux 상태가 있는 페이지로 이동한 후 해당 상태를 저장소의 현재 상태와 병합하고 새 저장소를 만듭니다
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // 현재 스토어 초기화
    store = undefined;
  }

  // SSG 및 SSR의 경우 항상 새 저장소를 만듭니다.
  if (typeof window === 'undefined') return _store;
  // 클라이언트에서 한 번 스토어 생성
  if (!store) store = _store;

  return _store;
};
export const useStore = (initialState: AppState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

export type OptionalStore = Store | undefined;

export type Store = ReturnType<typeof makeStore>;

export type AppState = ReturnType<Store['getState']>;

export type AppDispatch = Store['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
