import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import QuantityFiled from 'components/form-controls/QuantityFiled';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCardForm({ onSubmit = null }) {
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Minimum value is 1')
      .max(10, 'Maximum value is 10')
      .required('Please enter quantity')
      .typeError('Please enter a number'),
  });

  const defaultValues = {
    quantity: 1,
  };

  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleCartSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
    form.reset();
    enqueueSnackbar('Add to cart successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleCartSubmit)}>
      <QuantityFiled form={form} name="quantity" label="Quantity" />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="normal"
        sx={{ width: 250 }}
      >
        Add to cart
      </Button>
    </form>
  );
}

export default AddToCardForm;
