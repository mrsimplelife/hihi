import Examples from '../components/example';
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { initializeStore } from '../app/store';
import {
  serverRenderClock,
  startClock,
} from '../features/persist/persistSlice';

const PersistPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setInterval(() => dispatch(startClock()), 1000);
  }, [dispatch]);
  return <Examples />;
};
export default PersistPage;

export async function getStaticProps() {
  const store = initializeStore();
  store.dispatch(serverRenderClock());
  return {
    props: { initialReduxState: store.getState() },
  };
}
