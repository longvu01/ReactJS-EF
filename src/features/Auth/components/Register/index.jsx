import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;

      // Dispatch action + unwrap result
      await dispatch(register(values)).unwrap();

      closeDialog?.();

      // Show notistack
      enqueueSnackbar('Register successfully!', {
        variant: 'success',
        persist: false,
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        persist: false,
      });
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}

export default Register;
