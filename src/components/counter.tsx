import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  decrementCount,
  incrementCount,
  resetCount,
} from '../features/persist/persistSlice';

const Counter = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.persist.count);

  return (
    <div>
      <h1>
        Count: <span>{counter}</span>
      </h1>
      <button onClick={() => dispatch(incrementCount())}>+1</button>
      <button onClick={() => dispatch(decrementCount())}>-1</button>
      <button onClick={() => dispatch(resetCount())}>Reset</button>
    </div>
  );
};

export default Counter;
