import { Box, Rating } from '@mui/material';
import React from 'react';
import { formatDate } from 'utils';
import styles from './ReviewItem.module.scss';

function ReviewItem({ review }) {
  const { fullName, rating, reviewContent, releaseDate } = review;

  return (
    <Box sx={{ mb: 4 }}>
      {/* Review header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <Box className={styles.avatar}>{fullName[0]}</Box>
          {fullName}
        </Box>
        {formatDate(releaseDate)}
      </Box>
      {/* Review content */}
      <Box className={styles.reviewContent}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Đánh giá: <Rating value={rating} readOnly />
        </Box>
        <Box>Nhận xét: {reviewContent}</Box>
      </Box>
    </Box>
  );
}

export default ReviewItem;
