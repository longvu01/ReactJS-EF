import ReviewForm from 'features/Review/components/ReviewForm';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from './reviewSlice';

Review.propTypes = {
  closeDialog: PropTypes.func,
};
function Review({ closeDialog, productId, userId }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      // Set productId, userId to request body
      values.productId = productId;
      values.userId = userId;

      await dispatch(addReview(values)).unwrap();

      closeDialog?.();

      // Show notistack
      enqueueSnackbar('Review successfully!', {
        variant: 'success',
        persist: false,
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        persist: false,
      });
    }
  };

  return <ReviewForm onSubmit={handleSubmit} />;
}

export default Review;
