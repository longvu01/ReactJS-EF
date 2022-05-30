import { ShoppingCart } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { Box, IconButton, Rating, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, getPlaceholderThumbnailUrl } from 'utils';
import styles from './SlickItem.module.scss';

const fakeRating = () => Math.ceil(Math.random() * 2) + 3;

function SlickItem({ product }) {
  const {
    id,
    name,
    thumbnail,
    category: categoryId,
    salePrice,
    originalPrice,
    promotionPercent,
  } = product;

  const thumbnailUrl = thumbnail
    ? `${STATIC_HOST}${thumbnail?.url}`
    : getPlaceholderThumbnailUrl(categoryId);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.thumbnailContainer}>
        <img
          src={thumbnailUrl}
          alt={name}
          width="100%"
          height="100%"
          className={styles.thumbnail}
          // onClick={handleNavigate}
        />
      </Box>

      <Box className={styles.ratingBox}>
        <span className={styles.rating}>
          <Rating value={fakeRating()} readOnly size="small" />
          {`(${fakeRating()})`}
        </span>
        <span className={styles.ratingQty}>{`Mã: ${id}`}</span>
      </Box>

      <Typography
        className={styles.title}
        variant="subtitle1"
        onClick={handleNavigate}
      >
        {name}
      </Typography>

      <Box className={styles.priceBox}>
        {promotionPercent > 0 && (
          <Box className={styles.promotionBox}>
            <Box component="span" className={styles.originalPrice}>
              {formatCurrency(originalPrice)}
            </Box>
            <Box component="span" className={styles.promotionPercent}>
              {`(Tiết kiệm: ${promotionPercent}%)`}
            </Box>
          </Box>
        )}
        <Box component="span" className={styles.salePrice}>
          {formatCurrency(salePrice)}
        </Box>
      </Box>

      <Box className={styles.statusBox}>
        <Typography className={styles.status} variant="p">
          <CheckIcon /> Còn hàng
        </Typography>
        <IconButton size="large" aria-label="add to cart" color="inherit">
          <ShoppingCart />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SlickItem;
