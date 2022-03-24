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
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  formatCurrency,
  getPlaceholderThumbnailUrl,
  purchaseCartItems,
  removeCartItemStorageActive,
  removeFromCartStorage,
  setAllCartItemStorageActive,
  setCartItemStorageActive,
  setQuantityCartItem,
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
  cartItemsCountSelector,
  cartTotalActiveSelector,
  cartTotalPriceSelector,
  cartTotalPromotionSelector,
  cartTotalProvisionalSelector,
} from './selectors';

function CartFeature(props) {
  const navigate = useNavigate();

  const [deleteAll, setDeleteAll] = useState(false);
  const [showDialogItem, setShowDialogItem] = useState(false);
  const [showBackDrop, setOpenBackDrop] = useState(false);
  const idRemove = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  /* Redux state */
  const dispatch = useDispatch();
  const cartTotalPrice = useSelector(cartTotalPriceSelector);
  const cartTotalPromotion = useSelector(cartTotalPromotionSelector);
  const cartTotalProvisional = useSelector(cartTotalProvisionalSelector);
  const cartTotalActive = useSelector(cartTotalActiveSelector);
  const cartCount = useSelector(cartItemsCountSelector);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const CartItemCount = cartItems.length;

  /* Func get thumbnail for cart item */
  const getThumbnailUrl = (product) => {
    return product.thumbnail?.url
      ? `${STATIC_HOST}${product.thumbnail.url}`
      : getPlaceholderThumbnailUrl(product.category?.id);
  };

  /* Handlers */
  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  const handleBackToHomePage = () => {
    navigate('/');
  };

  const handleChangeOpen = (isOpen = false) => {
    setShowDialogItem(isOpen);
  };

  /* Cart */
  const handleSetQuantity = (id, quantity, isRemove = false) => {
    if (isRemove) {
      setShowDialogItem(true);
      idRemove.current = id;
    } else {
      dispatch(setQuantity({ id, quantity }));

      const item = cartItems.find((item) => item.id === id);
      if (item) setQuantityCartItem(id, quantity);
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
    setShowDialogItem(true);
    idRemove.current = id;
  };

  const handleButtonDeleteAllClick = () => {
    if (cartTotalActive > 0) {
      setShowDialogItem(true);
      setDeleteAll(true);
    } else {
      enqueueSnackbar('Bạn chưa chọn sản phẩm để xóa', {
        variant: 'info',
        autoHideDuration: 3000,
      });
    }
  };

  const handleCartItemActive = (e, id) => {
    const isActive = e.target.checked;
    dispatch(setActiveCartItem({ id, isActive }));

    setCartItemStorageActive(id, isActive);
  };

  const handleAllCartItemActive = () => {
    if (cartTotalActive < CartItemCount) {
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
        dispatch(purchaseCartItem());
        console.log('purchaseCart (call API...)');
        purchaseCartItems();
        enqueueSnackbar('Bạn đã đặt mua sản phẩm thành công', {
          variant: 'success',
          autoHideDuration: 3000,
        });
      }, 2000);
    } else {
      enqueueSnackbar('Bạn cần chọn sản phẩm trước', {
        variant: 'info',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Box>
      <Container className={styles.container}>
        <Typography variant="h5" component="h1" className={styles.cartTitle}>
          GIỎ HÀNG
        </Typography>
        {CartItemCount ? (
          <Grid container spacing={1}>
            {/* Left side */}
            <Grid item className={styles.left}>
              <Paper elevation={0} className={styles.cartHeader}>
                <FormGroup>
                  <FormControlLabel
                    checked={
                      cartTotalActive === CartItemCount && CartItemCount > 0
                    }
                    control={<Checkbox onChange={handleAllCartItemActive} />}
                    label={`Tất cả (${cartCount} sản phẩm)`}
                  />
                </FormGroup>

                <Typography
                  variant="h7"
                  component="p"
                  className={styles.cartHeaderItem}
                >
                  Đơn giá
                </Typography>

                <Typography
                  variant="h7"
                  component="p"
                  className={styles.cartHeaderItem}
                >
                  Số lượng
                </Typography>

                <Typography
                  variant="h7"
                  component="p"
                  className={styles.cartHeaderItem}
                >
                  Thành tiền
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
                {[...cartItems].reverse().map((item) => (
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

                      {/* Đơn giá */}
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

                      {/* Thành tiền */}
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
              showDialog={showDialogItem}
              onChangeOpen={handleChangeOpen}
              onDelete={handleDeleteCartItem}
              isDeleteAll={deleteAll}
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
                    Tạm tính
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
                        Giảm giá
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
                    Tổng cộng
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
                      (Đã bao gồm VAT nếu có)
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
              >{`Mua hàng (${cartTotalActive})`}</Button>
            </Grid>
          </Grid>
        ) : (
          <Box className={styles.noCartItems}>
            <Typography variant="h7" component="p">
              Không có sản phẩm nào trong giỏ hàng của bạn.
            </Typography>
            <img src={shoppingCart} alt="shoppingCart" />
            <Button onClick={handleBackToHomePage}>Tiếp tục mua sắm</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CartFeature;
