import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from 'utils';
import { cartTotalSelector } from './selectors';

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  console.log(formatCurrency(cartTotal));

  return <div>CartFeature</div>;
}

export default CartFeature;
