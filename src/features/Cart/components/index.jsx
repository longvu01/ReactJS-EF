import { yupResolver } from '@hookform/resolvers/yup';
import QuantityForm from 'components/form-controls/QuantityForm';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

UpdateQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdateQuantityForm({ quantity = 1, onSubmit = null, id }) {
  const schema = yup.object().shape({
    // quantity: yup
    //   .number()
    //   .min(1, 'Minimum value is 1')
    //   .max(10, 'Maximum value is 10')
    //   .required('Please enter quantity')
    //   .typeError('Please enter a number'),
  });

  const form = useForm({
    reValidateMode: 'onChange',
    defaultValues: { quantity },
    resolver: yupResolver(schema),
  });

  const handleSetQuantity = (quantity, isRemove = false) => {
    if (onSubmit) onSubmit(id, quantity, isRemove);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSetQuantity)}>
      <QuantityForm
        form={form}
        name="quantity"
        label=""
        onSetQuantity={handleSetQuantity}
      />
    </form>
  );
}

export default UpdateQuantityForm;
