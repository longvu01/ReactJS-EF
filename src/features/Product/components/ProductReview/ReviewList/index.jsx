import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReviewItem from '../ReviewItem';

function ReviewList({ reviews, onFetchReviews }) {
  if (reviews.length === 0) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        Sản phẩm này chưa được đánh giá. Hãy là người đầu tiên
      </Box>
    );
  }

  return (
    <ul style={{ listStyle: 'none' }}>
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
