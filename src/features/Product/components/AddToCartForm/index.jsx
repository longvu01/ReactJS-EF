import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import QuantityFiled from 'components/form-controls/QuantityFiled';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
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
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleAddToCartSubmit = (values) => {
    if (onSubmit) onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleAddToCartSubmit)}>
      <QuantityFiled form={form} name="quantity" label="Quantity" />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="normal"
        sx={{ width: 250 }}
      >
        Thêm vào giỏ
      </Button>
    </form>
  );
}

export default AddToCartForm;
