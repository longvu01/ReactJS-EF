import { Box } from '@mui/material';
import { Carousel } from '@trendyol-js/react-carousel';
import { STATIC_HOST } from 'constants';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { getPlaceholderThumbnailUrl } from 'utils';
import styles from './ProductThumbnail.module.scss';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(() =>
    product.thumbnail
      ? `${STATIC_HOST}${product.thumbnail.url}`
      : getPlaceholderThumbnailUrl(product.category?.id)
  );

  return (
    <Box className={styles.root}>
      <ReactImageMagnify
        className={styles.thumbnailContainer}
        {...{
          imageClassName: styles.thumbnail,
          smallImage: {
            src: thumbnailUrl,
            alt: `${product.name}`,
            isFluidWidth: true,
          },
          largeImage: {
            src: thumbnailUrl,
            alt: `${product.name}`,
            width: 1000,
            height: 1000,
          },
          isActivatedOnTouch: true,
          isHintEnabled: true,
          enlargedImageContainerStyle: { zIndex: 10 },
        }}
      />
      <Carousel show={5} slide={3} swiping rightArrow leftArrow>
        {/* Fake slider */}
        {Array.from(new Array(6)).map((_, index) => (
          <Box key={index} margin={1}>
            <img
              src={thumbnailUrl}
              alt={product.name}
              onClick={(e) => setThumbnailUrl(e.target.src)}
              className={styles.reviewImagesItem}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default ProductThumbnail;
