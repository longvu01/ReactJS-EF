import QuantityForm from 'components/form-controls/QuantityForm';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

UpdateQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdateQuantityForm({ quantity = 1, onSubmit = null, id }) {
  const form = useForm({
    reValidateMode: 'onChange',
    defaultValues: { quantity },
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
