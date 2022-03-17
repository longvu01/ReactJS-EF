import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import styles from './QuantityFiled.module.scss';

QuantityFiled.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityFiled(props) {
  const { form, name, label, disabled } = props;
  const { setValue } = form;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <Box className={styles.box}>
          <IconButton
            onClick={() => setValue(name, +value - 1)}
            className={styles.qtyButton}
          >
            <RemoveCircleOutline />
          </IconButton>

          <TextField
            margin="normal"
            variant="outlined"
            size="small"
            //
            label={label}
            disabled={disabled}
            //
            type="number"
            //
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            //
            error={invalid}
            helperText={error?.message}
          />

          <IconButton
            onClick={() => setValue(name, +value + 1)}
            className={styles.qtyButton}
          >
            <AddCircleOutline />
          </IconButton>
        </Box>
      )}
    />
  );
}

export default QuantityFiled;
