import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { formatCurrency } from 'utils';
import styles from './ProductInfo.module.scss';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;

  return (
    <Box className={styles.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={styles.description}>
        {shortDescription}
      </Typography>

      <Box className={styles.priceBox}>
        <Box component="span" className={styles.salePrice}>
          {formatCurrency(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={styles.originalPrice}>
              {formatCurrency(originalPrice)}
            </Box>
            <Box component="span" className={styles.promotionPercent}>
              {` -${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
