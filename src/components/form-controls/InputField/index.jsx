import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          //
          label={label}
          disabled={disabled}
          //
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          //
          error={invalid}
          helperText={error?.message}
        />
      )}
    />
  );
}

export default InputField;
