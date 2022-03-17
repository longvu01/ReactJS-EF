import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './selectors';
import { formatCurrency } from 'utils';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  console.log(formatCurrency(cartTotal));

  return <div>CartFeature</div>;
}

export default CartFeature;
