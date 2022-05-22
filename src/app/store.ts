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

export const initializeStore = (preloadedState?: AppState) => {
  return makeStore(preloadedState);
};

export const useStore = (initialState: AppState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

export type AppState = ReturnType<ReturnType<typeof makeStore>['getState']>;

export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
