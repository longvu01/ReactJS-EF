import { Box, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { formatCurrency } from 'helpers';
import PropTypes from 'prop-types';
import React from 'react';

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;

  return (
    <Box padding={1}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
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
