import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, AppState } from './store';

export const useForm = <TContent>(defaultValues: TContent) => {
  return (handler: (content: TContent) => Promise<void>) => {
    return async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.persist();

      const form = event.target as HTMLFormElement;
      const elements = Array.from(form.elements) as HTMLInputElement[];
      const data = elements
        .filter((element) => element.hasAttribute('name'))
        .reduce(
          (object, element) => ({
            ...object,
            [`${element.getAttribute('name')}`]: element.value,
          }),
          defaultValues
        );
      await handler(data);
      form.reset();
    };
  };
};

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any) => {
      return savedCallback.current?.(...args);
    };
    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// 일반 `useDispatch` 및 `useSelector` 대신 앱 전체에서 사용
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
