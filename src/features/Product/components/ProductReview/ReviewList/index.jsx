import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReviewItem from '../ReviewItem';

function ReviewList({ reviews, onFetchReviews }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let timeoutId;

    if (refreshCount > 3) {
      setDisabledButton(true);
      enqueueSnackbar(
        'Bạn đang tải lại bình luận quá nhanh, vui lòng đợi trong giây lát!',
        {
          variant: 'warning',
          persist: false,
        }
      );

      timeoutId = setTimeout(() => {
        setDisabledButton(false);
        setRefreshCount(0);
      }, 10000);
    }

    return () => clearTimeout(timeoutId);
  }, [refreshCount, enqueueSnackbar]);

  if (reviews.length === 0) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        Sản phẩm này chưa được đánh giá. Hãy là người đầu tiên
      </Box>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        disabled={disabledButton}
        startIcon={<RefreshIcon />}
        onClick={() => {
          onFetchReviews?.();
          setRefreshCount((prevCount) => ++prevCount);
        }}
      >
        Tải lại
      </Button>
      <ul style={{ listStyle: 'none' }}>
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
