import { AccountCircle, Close, ShoppingCart } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout, unSetRequireLogin } from 'features/Auth/userSlice';
import {
  getExistingCart,
  hideMiniCart,
  resetCart,
  showMiniCart,
} from 'features/Cart/cartSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getExistingCartStorage } from 'utils';
import FormSearch from './components/FormSearch';
import NavLinkHeader from './components/NavLinkHeader';
import styles from './Header.module.scss';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function Header() {
  const navigate = useNavigate();
  const tooltipTimeoutId = useRef();

  // Redux state
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = Boolean(loggedInUser.id);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const isRequireLogin = useSelector((state) => state.user.isRequireLogin);
  const openTooltip = useSelector((state) => state.cart.isShowMiniCart);
  const dispatch = useDispatch();

  // React state
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  // If add item to cart without logged in
  useEffect(() => {
    if (isRequireLogin) setOpenDialog(true);
  }, [isRequireLogin]);

  useEffect(() => {
    if (isLoggedIn) {
      // console.log({ isLoggedIn });
      const cartData = getExistingCartStorage();

      if (cartData) dispatch(getExistingCart(cartData));
    }
  }, [isLoggedIn, dispatch]);

  // Dialog
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(unSetRequireLogin());
  };

  // Menu
  const openMenu = Boolean(anchorEl);

  const handleUserIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Logout
  const handleLogoutClick = () => {
    dispatch(logout());

    // Reset redux cart
    dispatch(resetCart());

    handleCloseMenu();
  };

  const handleCartClick = () => {
    navigate('cart');
  };

  // Tooltip cart
  useEffect(() => {
    if (openTooltip) {
      dispatch(showMiniCart());

      tooltipTimeoutId.current = setTimeout(() => {
        dispatch(hideMiniCart());
      }, 5000);
    }

    return () => {
      clearTimeout(tooltipTimeoutId.current);
      dispatch(hideMiniCart());
    };
  }, [cartItemsCount, openTooltip, dispatch]);

  const handleCloseMiniCart = () => {
    dispatch(hideMiniCart());
  };

  const handleGoToCartClick = () => {
    navigate('cart');
    dispatch(hideMiniCart());
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Icon */}
          <CodeIcon style={{ padding: 4 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={styles.link} to="/">
              EZ SHOP
            </Link>
          </Typography>

          {/* Form Search */}
          <FormSearch />

          {/* Links */}
          <NavLinkHeader to="products" content="ListPage" />
          <NavLinkHeader to="todos" content="Todos" />
          <NavLinkHeader to="albums" content="Albums" />

          {/* Button login/out */}
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpenDialog}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserIconClick}>
              <AccountCircle />
            </IconButton>
          )}

          {/* Dialog login/ register */}
          <Dialog
            className={styles.dialogRoot}
            disableEscapeKeyDown
            open={openDialog}
            onClose={handleCloseDialog}
          >
            <IconButton
              className={styles.closeButton}
              onClick={handleCloseDialog}
            >
              <Close />
            </IconButton>

            <DialogContent>
              {mode === MODE.REGISTER && (
                <Box>
                  <Register closeDialog={handleCloseDialog} />

                  <Box textAlign="center">
                    <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                      Already have an account? Login here
                    </Button>
                  </Box>
                </Box>
              )}
              {mode === MODE.LOGIN && (
                <Box>
                  <Login closeDialog={handleCloseDialog} />

                  <Box textAlign="center">
                    <Button
                      color="primary"
                      onClick={() => setMode(MODE.REGISTER)}
                    >
                      Don't have an account? Register here
                    </Button>
                  </Box>
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>

          {/* Cart tooltip */}
          <Tooltip
            title={
              <Paper className={styles.tooltipRoot} elevation={0}>
                <Button
                  color="primary"
                  size="small"
                  className={styles.tooltipButtonClose}
                  onClick={handleCloseMiniCart}
                >
                  <CloseIcon />
                </Button>
                <Typography className={styles.tooltipText}>
                  <CheckCircleIcon style={{ color: 'green' }} />
                  Th??m h??ng v??o gi??? th??nh c??ng!
                </Typography>
                <Button
                  size="small"
                  className={styles.tooltipButtonNavigate}
                  onClick={handleGoToCartClick}
                >
                  Xem gi??? h??ng v?? thanh to??n
                </Button>
              </Paper>
            }
            arrow
            open={openTooltip}
            placement="bottom-end"
            // followCursor
            disableHoverListener
          >
            <IconButton
              size="large"
              aria-label="show new products"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* User menu when click to account icon */}
      <Menu
        className={styles.userMenu}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          {loggedInUser.fullName || 'Profile'}
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default Header;
