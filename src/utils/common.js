import { THUMBNAIL_PLACEHOLDER } from 'constants';

const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const getPlaceholderThumbnailUrl = (categoryId) => {
  if (!categoryId || !THUMBNAIL_PLACEHOLDER[categoryId])
    return 'https://via.placeholder.com/444';
  return THUMBNAIL_PLACEHOLDER[categoryId];
};

export { formatCurrency, getPlaceholderThumbnailUrl };
