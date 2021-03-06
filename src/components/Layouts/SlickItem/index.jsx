import { ShoppingCart } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { Box, IconButton, Rating, Typography } from '@mui/material';
import { STATIC_HOST } from 'constants';
import { setRequireLogin } from 'features/Auth/userSlice';
import { addToCart, showMiniCart } from 'features/Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addItemToCartStorage,
  formatCurrency,
  getPlaceholderThumbnailUrl,
} from 'utils';
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

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = Boolean(loggedInUser.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`products/${id}`);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      dispatch(setRequireLogin());
      return;
    }

    const newCartItem = {
      id,
      product,
      quantity: 1,
      isActive: false,
    };

    dispatch(showMiniCart());
    dispatch(addToCart(newCartItem));

    /* Add cart item */
    addItemToCartStorage(newCartItem);
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
        <span className={styles.ratingQty}>{`M??: ${id}`}</span>
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
              {`(Ti???t ki???m: ${promotionPercent}%)`}
            </Box>
          </Box>
        )}
        <Box component="span" className={styles.salePrice}>
          {formatCurrency(salePrice)}
        </Box>
      </Box>

      <Box className={styles.statusBox}>
        <Typography className={styles.status} variant="p">
          <CheckIcon /> C??n h??ng
        </Typography>
        <IconButton
          size="large"
          aria-label="add to cart"
          color="inherit"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SlickItem;
