import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, LinearProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './LoginForm.module.scss';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit }) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup.string().required('Please enter your password.'),
  });

  const defaultValues = {
    identifier: '',
    password: '',
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleLoginSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  return (
    <div className={styles.root}>
      {isSubmitting && <LinearProgress className={styles.progress} />}

      <Avatar className={styles.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography className={styles.title} component="h3" variant="h5">
        Sign in
      </Typography>

      <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
        <InputField form={form} name="identifier" label="Email" />
        <PasswordField form={form} name="password" label="Password" />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={styles.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ marginTop: '12px' }}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
