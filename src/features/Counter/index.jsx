import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

Counter.propTypes = {};

function Counter(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const handleIncreaseClick = () => {
    const action = increase();
    dispatch(action);
  };

  const handleDecreaseClick = () => {
    const action = decrease();
    dispatch(action);
  };

  return (
    <div>
      Counter: {count}
      <button onClick={handleIncreaseClick}>Increase</button>
      <button onClick={handleDecreaseClick}>Decrease</button>
    </div>
  );
}

export default Counter;
