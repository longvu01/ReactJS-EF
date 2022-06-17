import { Box } from '@mui/material';
import ReviewItem from '../ReviewItem';

function ReviewList({ reviews = [] }) {
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
