import { AccountCircle, Close, ShoppingCart } from '@mui/icons-material';
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
import Login from 'features/Auth/component/Login';
import Register from 'features/Auth/component/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import EZLogo from 'imgs/EZ-logo.png';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function Header() {
  const navigate = useNavigate();
  const tooltipRef = useRef();

  // Redux state
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = Boolean(loggedInUser.id);
  const cartItemsCount = useSelector(cartItemsCountSelector);

  // React state
  const [openDialog, setOpenDialog] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  // Dialog
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Menu
  const openMenu = Boolean(anchorEl);

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Logout
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);

    setAnchorEl(null);
  };

  const handleCartClick = () => {
    navigate('cart');
  };

  // Tooltip cart
  useEffect(() => {
    if (cartItemsCount > 0) {
      setOpenTooltip(true);
      tooltipRef.current = setTimeout(() => {
        setOpenTooltip(false);
      }, 3000);
    }
    return () => {
      clearTimeout(tooltipRef.current);
    };
  }, [cartItemsCount]);

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon style={{ padding: 4 }} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={styles.link} to="/">
              <img
                src={EZLogo}
                alt={EZLogo}
                width={15}
                style={{ paddingRight: 2 }}
              />
              EZ SHOP
            </Link>
          </Typography>

          {/* Link */}
          <NavLink
            className={styles.link}
            to="/products"
            style={({ isActive }) =>
              isActive
                ? {
                    color: 'orangered',
                  }
                : undefined
            }
          >
            <Button color="inherit">ListPage</Button>
          </NavLink>

          <NavLink
            className={styles.link}
            to="/todos"
            style={({ isActive }) =>
              isActive
                ? {
                    color: 'orangered',
                  }
                : undefined
            }
          >
            <Button color="inherit">Todos</Button>
          </NavLink>

          <NavLink
            className={styles.link}
            to="/albums"
            style={({ isActive }) =>
              isActive
                ? {
                    color: 'orangered',
                  }
                : undefined
            }
          >
            <Button color="inherit">Albums</Button>
          </NavLink>
          {/* Link */}

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpenDialog}>
              Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}

          <Tooltip
            title={
              <Paper>
                <Button
                  color="primary"
                  size="small"
                  className={styles.tooltipButton}
                  onClick={() => navigate('/cart')}
                >
                  Go to Cart
                </Button>
              </Paper>
            }
            arrow
            open={openTooltip}
            onClose={handleCloseTooltip}
            onOpen={handleOpenTooltip}
            placement="bottom-end"
            // followCursor
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

      <Menu
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

      <Dialog
        className={styles.root}
        disableEscapeKeyDown
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <IconButton className={styles.closeButton} onClick={handleCloseDialog}>
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
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
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
    </Box>
  );
}

export default Header;
