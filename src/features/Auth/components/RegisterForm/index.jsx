import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, LinearProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './RegisterForm.module.scss';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm({ onSubmit }) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test(
        'should has at least two words',
        'Please enter at least two words.',
        (value) => {
          return value.split(' ').length >= 2;
        }
      ),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup
      .string()
      .required('Please enter your password.')
      // .min(6, 'Please enter at least 6 characters.'),
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.'
      ),
    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleRegisterSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  return (
    <div className={styles.root}>
      {isSubmitting && <LinearProgress className={styles.progress} />}

      <Avatar className={styles.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography className={styles.title} component="h3" variant="h5">
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
        <InputField form={form} name="fullName" label="Full Name" />
        <InputField form={form} name="email" label="Email" />
        <PasswordField form={form} name="password" label="Password" />
        <PasswordField
          form={form}
          name="retypePassword"
          label="Retype Password"
        />

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
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
