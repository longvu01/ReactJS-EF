import { Box } from '@mui/material';
import { STATIC_HOST } from 'constants';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaceholderThumbnailUrl } from 'utils';

function SlickItem({ product }) {
  const thumbnailUrl = useMemo(() => {
    return product.thumbnail
      ? `${STATIC_HOST}${product.thumbnail?.url}`
      : getPlaceholderThumbnailUrl(product.category?.id);
  }, [product.thumbnail, product.category?.id]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Box sx={{ padding: '24px', cursor: 'pointer' }} onClick={handleNavigate}>
      <img src={thumbnailUrl} alt={product.name} width="100%" height="100%" />
      <h3>{product.name}</h3>
    </Box>
  );
}

export default SlickItem;
