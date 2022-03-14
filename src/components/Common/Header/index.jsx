import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function Header() {
  const dispatch = useDispatch();

  // Redux state
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = Boolean(loggedInUser.id);

  // React state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  // Dialog
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon style={{ padding: 4 }} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={styles.link} to="/">
              EZ SHOP
            </Link>
          </Typography>

          {/* Link */}
          <NavLink className={styles.link} to="/todos">
            <Button color="inherit">Todos</Button>
          </NavLink>

          <NavLink className={styles.link} to="/albums">
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
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog
        className={styles.root}
        disableEscapeKeyDown
        open={open}
        onClose={handleCloseDialog}
      >
        <IconButton className={styles.closeButton} onClick={handleCloseDialog}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleCloseDialog} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account? Login here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleCloseDialog} />
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account? Register here
                </Button>
              </Box>
            </>
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
