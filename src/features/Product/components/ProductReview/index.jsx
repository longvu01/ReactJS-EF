import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
import ProgressRating from 'components/Common/ProgressRating';
import { setRequireLogin, unSetRequireLogin } from 'features/Cart/cartSlice';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewDataService from 'services/review';
import Review from '../../../Review';
import styles from './ProductReview.module.scss';
import ReviewList from './ReviewList';

function ProductReview({ product }) {
  const [reviews, setReviews] = useState([]);
  const [ratingValues, setRatingValues] = useState({});
  const loggedInUser = useSelector((state) => state.user.current);
  const currentUserId = loggedInUser?.id;

  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const fetchDataReviews = useCallback(async () => {
    try {
      const querySnapshot = await ReviewDataService.getAll(product.id);
      const dataReviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(dataReviews);
    } catch (error) {
      console.log('Failed to fetch reviews', error);
    }
  }, [product.id]);

  useEffect(() => {
    fetchDataReviews();
  }, [fetchDataReviews]);

  const totalReviews = reviews.length;

  const ratingTotal =
    reviews.reduce((total, cur) => total + cur.rating, 0) / reviews.length;

  useEffect(() => {
    const ratings = {};

    reviews.forEach((review) => {
      ratings[review.rating] = ratings[review.rating]
        ? ++ratings[review.rating]
        : 1;
    });

    setRatingValues(ratings);
  }, [reviews]);

  // Dialog
  const handleClickOpenDialog = () => {
    if (!currentUserId) {
      dispatch(setRequireLogin());
      enqueueSnackbar('Bạn cần đăng nhập trước khi đánh giá!', {
        variant: 'info',
        persist: false,
      });
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(unSetRequireLogin());
  };

  return (
    <Paper elevation={0} style={{ padding: 15 }} className={styles.root}>
      <Typography variant="h6" color="text.primary">
        Đánh giá & nhận xét {product.name}
      </Typography>

      <Box className={styles.overView}>
        <Grid container>
          {/* Left */}
          <Grid item className={styles.left}>
            <Typography variant="h6" color="text.primary">
              {ratingTotal || 0}/5
            </Typography>
            <Rating value={ratingTotal} readOnly />
            <Box>
              <Box component="span" className={styles.reviewQty}>
                {totalReviews}
              </Box>
              <Box component="span"> đánh giá & nhận xét</Box>
            </Box>
          </Grid>

          {/* Right */}
          <Grid item className={styles.right}>
            <ProgressRating
              starNumber="5"
              value={ratingValues[5] || 0}
              total={totalReviews}
            />
            <ProgressRating
              starNumber="4"
              value={ratingValues[4] || 0}
              total={totalReviews}
            />
            <ProgressRating
              starNumber="3"
              value={ratingValues[3] || 0}
              total={totalReviews}
            />
            <ProgressRating
              starNumber="2"
              value={ratingValues[2] || 0}
              total={totalReviews}
            />
            <ProgressRating
              starNumber="1"
              value={ratingValues[1] || 0}
              total={totalReviews}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Review info */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          my: 2,
        }}
      >
        Bạn đánh giá sao sản phẩm này?
        <Button
          variant="contained"
          color="error"
          size="normal"
          sx={{ width: 350 }}
          onClick={handleClickOpenDialog}
        >
          Đánh giá ngay
        </Button>
      </Box>

      {/* Dialog review */}
      <Dialog
        className={styles.dialogRoot}
        disableEscapeKeyDown
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 24px',
          }}
        >
          <Typography variant="h6" color="text.primary">
            Đánh giá & nhận xét sản phẩm
          </Typography>
          <IconButton
            className={styles.closeButton}
            onClick={handleCloseDialog}
          >
            <Close />
          </IconButton>
        </Box>

        <DialogContent>
          <Review
            closeDialog={handleCloseDialog}
            productId={product.id}
            userId={currentUserId}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <ReviewList reviews={reviews} onFetchReviews={fetchDataReviews} />
    </Paper>
  );
}

export default ProductReview;
