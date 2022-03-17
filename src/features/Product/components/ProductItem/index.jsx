import { Box, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatCurrency, getPlaceholderThumbnailUrl } from 'utils';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductItem.module.scss';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const navigate = useNavigate();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : getPlaceholderThumbnailUrl(product.category?.id);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} className={styles.thumbnailContainer}>
        <img
          src={thumbnailUrl}
          alt={product.name}
          className={styles.thumbnail}
        />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {formatCurrency(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default ProductItem;
