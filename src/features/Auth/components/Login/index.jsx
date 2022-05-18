import { login } from 'features/Auth/userSlice';
import { getExistingCart } from 'features/Cart/cartSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getExistingCartStorage } from 'utils';
import LoginForm from '../LoginForm';

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      // Close Dialog
      closeDialog?.();

      const cartData = getExistingCartStorage();

      if (cartData) dispatch(getExistingCart(cartData));
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
