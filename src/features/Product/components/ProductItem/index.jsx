import { Box, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, getPlaceholderThumbnailUrl } from 'utils';
import styles from './ProductItem.module.scss';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const navigate = useNavigate();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : getPlaceholderThumbnailUrl(product.category?.id);

  const handleClick = () => {
    // navigate(`${product.id}`);
    navigate(product.id.toString());
  };

  return (
    <Box padding={1} className={styles.root} onClick={handleClick}>
      <Box className={styles.thumbnailContainer}>
        <img
          src={thumbnailUrl}
          alt={product.name}
          className={styles.thumbnail}
          width="100%"
        />
      </Box>

      <Box padding={1}>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {formatCurrency(product.salePrice)}
          </Box>
          {product.promotionPercent > 0 && ` -${product.promotionPercent}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductItem;
