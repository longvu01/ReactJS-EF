import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import RatingField from '../RatingField';
import styles from './ReviewForm.module.scss';

function ReviewForm({ onSubmit }) {
  const userName = useSelector((state) => state.user.current.fullName);

  const [rating, setRating] = useState(4);
  const [ratingHover, setRatingHover] = useState(-1);

  const handleRatingChange = (_, newRating) => {
    setRating(newRating);
  };
  const handleRatingHover = (_, newRatingHover) => {
    setRatingHover(newRatingHover);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required('Hãy điền tên bạn muốn hiển thị.'),
    reviewContent: yup
      .string()
      .required('Hãy nêu cảm nhận của bạn về sản phẩm.')
      .test(
        'should has at least two words',
        'Đánh giá cần tối thiểu 2 từ.',
        (value) => {
          return value.split(' ').length >= 2;
        }
      ),
  });

  const defaultValues = {
    fullName: userName,
    reviewContent: '',
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleReviewSubmit = async (values) => {
    if (!onSubmit) return;

    values.rating = rating;
    values.releaseDate = Date.now();

    await onSubmit(values);
  };

  return (
    <div className={styles.root}>
      {isSubmitting && <LinearProgress className={styles.progress} />}

      <form onSubmit={form.handleSubmit(handleReviewSubmit)}>
        <InputField form={form} name="fullName" label="Họ tên hiển thị" />
        <InputField
          form={form}
          name="reviewContent"
          label="Xin chia sẻ một số cảm nhận về sản phẩm..."
          multiline
        />

        <RatingField
          rating={rating}
          hover={ratingHover}
          onChange={handleRatingChange}
          onHover={handleRatingHover}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={styles.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 1 }}
        >
          Gửi đánh giá
        </Button>
      </form>
    </div>
  );
}

export default ReviewForm;
