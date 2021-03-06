import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import { STATIC_HOST } from 'constants';
import shoppingCart from 'imgs/tk-shopping-img.png';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  formatCurrency,
  getPlaceholderThumbnailUrl,
  purchaseCartStorage,
  removeCartItemStorageActive,
  removeFromCartStorage,
  setAllCartItemStorageActive,
  setCartItemStorageActive,
  setQuantityCartItemStorage,
} from 'utils';
import styles from './Cart.module.scss';
import {
  changeActiveAllCartItem,
  purchaseCartItem,
  removeCartItemsActive,
  removeFromCart,
  setActiveCartItem,
  setQuantity,
} from './cartSlice';
import UpdateQuantityForm from './components';
import DialogDelete from './components/DialogDelete';
import {
  activeCartItemsSelector,
  cartItemsCountSelector,
  cartTotalPriceSelector,
  cartTotalPromotionSelector,
  cartTotalProvisionalSelector,
} from './selectors';

function CartFeature(props) {
  const navigate = useNavigate();

  const [deleteMore, setDeleteMore] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showBackDrop, setOpenBackDrop] = useState(false);
  const idRemove = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  /* Redux state */
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);

  const cartTotalPrice = useSelector(cartTotalPriceSelector);
  const cartTotalPromotion = useSelector(cartTotalPromotionSelector);
  const cartTotalProvisional = useSelector(cartTotalProvisionalSelector);
  const cartTotalActive = useSelector(activeCartItemsSelector).length;
  const cartCount = useSelector(cartItemsCountSelector);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.length;

  /* Func get thumbnail for cart item */
  const getThumbnailUrl = (product) => {
    return product.thumbnail?.url
      ? `${STATIC_HOST}${product.thumbnail.url}`
      : getPlaceholderThumbnailUrl(product.category);
  };

  /* Handlers */
  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  const handleBackToHomePage = () => {
    navigate('/');
  };

  const handleChangeOpen = (isOpen = false) => {
    setShowDialogDelete(isOpen);
  };

  /* Cart */
  const handleSetQuantity = (id, quantity, isRemove = false) => {
    if (isRemove) {
      setShowDialogDelete(true);
      idRemove.current = id;
    } else {
      dispatch(setQuantity({ id, quantity }));

      const item = cartItems.find((item) => item.id === id);
      if (item) setQuantityCartItemStorage(id, quantity);
    }
  };

  const handleDeleteCartItem = (isDeleteAll) => {
    if (!isDeleteAll) {
      dispatch(removeFromCart(idRemove.current));
      removeFromCartStorage(idRemove.current);
    } else {
      dispatch(removeCartItemsActive());
      removeCartItemStorageActive();
    }
  };

  const handleButtonDeleteClick = (id) => {
    setShowDialogDelete(true);
    idRemove.current = id;
  };

  const handleButtonDeleteAllClick = () => {
    if (cartTotalActive <= 0) {
      enqueueSnackbar('B???n ch??a ch???n s???n ph???m ????? x??a', {
        variant: 'info',
      });
    } else if (cartTotalActive === 1) {
      setDeleteMore(false);
      setShowDialogDelete(true);
    } else {
      setDeleteMore(true);
      setShowDialogDelete(true);
    }
  };

  const handleCartItemActive = (e, id) => {
    const isActive = e.target.checked;
    dispatch(setActiveCartItem({ id, isActive }));

    setCartItemStorageActive(id, isActive);
  };

  const handleAllCartItemActive = () => {
    if (cartTotalActive < cartItemCount) {
      dispatch(changeActiveAllCartItem(true));
      setAllCartItemStorageActive(true);
    } else {
      dispatch(changeActiveAllCartItem(false));
      setAllCartItemStorageActive(false);
    }
  };

  const handlePurchaseCart = () => {
    if (cartTotalActive > 0) {
      setOpenBackDrop(true);

      /* Fake await api call */
      setTimeout(() => {
        setOpenBackDrop(false);
        // Remove from redux
        dispatch(purchaseCartItem());
        console.log('purchaseCart (call API...)');
        // Remove from localStorage
        purchaseCartStorage(loggedInUser.id);
        // Call Api

        enqueueSnackbar('B???n ???? ?????t mua s???n ph???m th??nh c??ng', {
          variant: 'success',
        });
      }, 2000);
    } else {
      enqueueSnackbar('B???n c???n ch???n s???n ph???m tr?????c', {
        variant: 'info',
      });
    }
  };

  return (
    <Box>
      <Container className={styles.container}>
        <Typography variant="h5" component="h1" className={styles.cartTitle}>
          GI??? H??NG
        </Typography>
        {cartItemCount > 0 ? (
          <Grid container spacing={1}>
            {/* Left side */}
            <Grid item className={styles.left}>
              <Paper elevation={0} className={styles.cartHeader}>
                <FormGroup>
                  <FormControlLabel
                    checked={
                      cartTotalActive === cartItemCount && cartItemCount > 0
                    }
                    control={<Checkbox onChange={handleAllCartItemActive} />}
                    label={`T???t c??? (${cartCount} s???n ph???m)`}
                  />
                </FormGroup>

                <Typography
                  variant="h7"
                  component="p"
                  className={styles.cartHeaderItem}
                >
                  ????n gi??
                </Typography>

                <Typography
                  variant="h7"
                  component="p"
                  className={styles.cartHeaderItem}
                >
                  S??? l?????ng
                </Typography>

                <Typography
                  variant="h7"
                  component="p"
                  className={styles.cartHeaderItem}
                >
                  Th??nh ti???n
                </Typography>

                <Typography
                  className={classNames(
                    styles.cartHeaderItem,
                    styles.cartIconDelete
                  )}
                >
                  <DeleteIcon onClick={handleButtonDeleteAllClick} />
                </Typography>
              </Paper>

              <Grid container className={styles.cartList}>
                {[...cartItems].map((item) => (
                  <Paper
                    key={item.id}
                    elevation={0}
                    className={styles.cartItemBox}
                  >
                    <Grid item className={styles.cartItem}>
                      <FormGroup className={styles.cartFormGroup}>
                        <FormControlLabel
                          checked={item.isActive}
                          control={
                            <Checkbox
                              onChange={(e) => handleCartItemActive(e, item.id)}
                            />
                          }
                          label=""
                        />

                        <Box
                          className={styles.navigationBox}
                          onClick={() => handleNavigate(item.id)}
                        >
                          <img
                            src={getThumbnailUrl(item.product)}
                            alt={item.product.name}
                            width={70}
                          />
                          <Typography
                            variant="h7"
                            component="p"
                            className={styles.cartItemText}
                          >
                            {item.product.name}
                          </Typography>
                        </Box>
                      </FormGroup>

                      {/* ????n gi?? */}
                      <Typography
                        variant="h7"
                        component="div"
                        className={styles.cartItemText}
                      >
                        {formatCurrency(item.product.salePrice)}
                        <Typography className={styles.originalPrice}>
                          {item.product.promotionPercent > 0 &&
                            formatCurrency(item.product.originalPrice)}
                        </Typography>
                      </Typography>

                      <Box className={styles.cartItemQuantityForm}>
                        <UpdateQuantityForm
                          quantity={item.quantity}
                          onSubmit={handleSetQuantity}
                          id={item.product.id}
                        />
                      </Box>

                      {/* Th??nh ti???n */}
                      <Typography
                        variant="h7"
                        component="p"
                        className={classNames(
                          styles.cartItemText,
                          styles.cartItemPrice
                        )}
                      >
                        {formatCurrency(item.product.salePrice * item.quantity)}
                      </Typography>

                      <Typography
                        className={classNames(
                          styles.cartItemText,
                          styles.cartIconDelete
                        )}
                      >
                        <DeleteIcon
                          onClick={() => handleButtonDeleteClick(item.id)}
                        />
                      </Typography>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
            </Grid>

            {/* Dialog Delete */}
            <DialogDelete
              showDialog={showDialogDelete}
              onChangeOpen={handleChangeOpen}
              onDelete={handleDeleteCartItem}
              isDeleteMore={deleteMore}
            />

            {/* Right side */}
            <Grid item className={styles.right}>
              <Paper elevation={0} className={styles.cartPurchase}>
                <Box className={styles.cartPurchaseRow}>
                  <Typography
                    variant="h7"
                    component="p"
                    className={styles.cartItemPurchaseText}
                  >
                    T???m t??nh
                  </Typography>
                  <Typography
                    variant="h7"
                    component="p"
                    className={styles.cartItemPurchaseText}
                  >
                    {formatCurrency(cartTotalProvisional)}
                  </Typography>
                </Box>

                <Box className={styles.cartPurchaseRow}>
                  {cartTotalPromotion > 0 && (
                    <>
                      <Typography
                        variant="h7"
                        component="p"
                        className={styles.cartItemPurchaseText}
                      >
                        Gi???m gi??
                      </Typography>
                      <Typography
                        variant="h7"
                        component="p"
                        className={styles.cartItemPurchaseText}
                      >
                        -{formatCurrency(cartTotalPromotion)}
                      </Typography>
                    </>
                  )}
                </Box>

                <Box
                  className={classNames(
                    styles.cartPurchaseRow,
                    styles.cartPurchaseTotal
                  )}
                >
                  <Typography
                    variant="h7"
                    component="p"
                    className={styles.cartItemPurchaseText}
                  >
                    T???ng c???ng
                  </Typography>
                  <Box class={styles.total}>
                    <Typography
                      variant="h7"
                      component="p"
                      className={classNames(
                        styles.cartItemPurchaseText,
                        styles.cartTotalPrice
                      )}
                    >
                      {formatCurrency(cartTotalPrice)}
                    </Typography>
                    <Typography
                      variant="h7"
                      component="p"
                      className={styles.cartItemPurchaseText}
                    >
                      (???? bao g???m VAT n???u c??)
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Backdrop when click purchase button */}
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={showBackDrop}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

              <Button
                onClick={handlePurchaseCart}
                className={styles.buttonPurchase}
                fullWidth
              >{`Ti???n h??nh ?????t h??ng (${cartTotalActive})`}</Button>
            </Grid>
          </Grid>
        ) : (
          <Box className={styles.noCartItems}>
            <Typography variant="h7" component="p">
              Kh??ng c?? s???n ph???m n??o trong gi??? h??ng c???a b???n.
            </Typography>
            <img src={shoppingCart} alt="shoppingCart" />
            <Button onClick={handleBackToHomePage}>Ti???p t???c mua s???m</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CartFeature;
