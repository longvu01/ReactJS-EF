import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import styles from './QuantityForm.module.scss';

QuantityForm.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,

  onSetQuantity: PropTypes.func,
};

function QuantityForm(props) {
  const { form, name, label, onSetQuantity } = props;
  const { setValue } = form;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        // field: { onChange, onBlur, value, name },
        field: { value, name },
        fieldState: { invalid, error },
      }) => (
        <Box className={styles.box}>
          <RemoveIcon
            onClick={() => {
              const newValue = +value - 1;
              if (newValue <= 0) {
                if (onSetQuantity) onSetQuantity(newValue, true);
              } else {
                setValue(name, newValue);
                if (onSetQuantity) onSetQuantity(newValue);
              }
            }}
            className={styles.qtyButton}
          >
            <RemoveCircleOutline />
          </RemoveIcon>

          <TextField
            margin="normal"
            variant="outlined"
            size="small"
            //
            label={label}
            disabled
            //
            type="number"
            //
            // onChange={onChange}
            // onBlur={onBlur}
            name={name}
            value={value}
            //
            error={invalid}
            helperText={error?.message}
            className={styles.textField}
          />

          <AddIcon
            onClick={() => {
              const newValue = +value + 1;
              setValue(name, newValue);
              if (onSetQuantity) onSetQuantity(newValue);
            }}
            className={styles.qtyButton}
          >
            <AddCircleOutline />
          </AddIcon>
        </Box>
      )}
    />
  );
}

export default QuantityForm;
