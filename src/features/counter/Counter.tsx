import { ChangeEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const handleDecrement = () => dispatch(decrement());
  const handleIncrement = () => dispatch(increment());

  const handleIncrementAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setIncrementAmount(e.target.value);

  const handleIncrementByAmount = () =>
    dispatch(incrementByAmount(incrementValue));
  const handleIncrementAsync = () => dispatch(incrementAsync(incrementValue));
  const handleIncrementIfOdd = () => dispatch(incrementIfOdd(incrementValue));

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={handleIncrementAmountChange}
        />
        <button className={styles.button} onClick={handleIncrementByAmount}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={handleIncrementAsync}>
          Add Async
        </button>
        <button className={styles.button} onClick={handleIncrementIfOdd}>
          Add If Odd
        </button>
      </div>
    </div>
  );
}

export default Counter;
