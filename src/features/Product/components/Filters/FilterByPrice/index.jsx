import { Box, Button, TextField, Typography } from '@mui/material';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './FilterByPrice.module.scss';
import { useSnackbar } from 'notistack';

FilterByPrice.propTypes = {
  onChange: propTypes.func,
};

function FilterByPrice({ onChange }) {
  const initValues = {
    salePrice_gte: 0,
    salePrice_lte: 0,
  };

  const [values, setValues] = useState(initValues);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!onChange) return;
    if (
      values.salePrice_gte < 0 ||
      values.salePrice_lte <= values.salePrice_gte
    ) {
      enqueueSnackbar('Khoảng giá không hợp lệ', { variant: 'error' });
      return;
    }

    onChange(values);
  };

  const handleReset = () => {
    setValues(initValues);
    if (onChange) onChange(initValues, true);
  };

  return (
    <Box className={styles.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={styles.range}>
        <TextField
          label="Từ"
          color="primary"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <TextField
          label="Đến"
          color="primary"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>

      <Box className="d-flex">
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Áp dụng
        </Button>
        <Button variant="outlined" color="primary" onClick={handleReset}>
          Đặt lại
        </Button>
      </Box>
    </Box>
  );
}

export default FilterByPrice;
