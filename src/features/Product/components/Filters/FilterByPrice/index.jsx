import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './FilterByPrice.module.scss';

FilterByPrice.propTypes = {
  filters: propTypes.object,
  onChange: propTypes.func,
};

function FilterByPrice({ filters, onChange }) {
  const { salePrice_gte, salePrice_lte } = filters;
  const initValues = {
    salePrice_gte: '',
    salePrice_lte: '',
  };

  const [values, setValues] = useState(() => {
    if (salePrice_gte && salePrice_lte) return filters;
    return initValues;
  });
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();

  useEffect(() => {
    if (salePrice_gte && salePrice_lte) {
      setValues(filters);
    } else {
      setValues(initValues);
    }
  }, [location.search]);

  // Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!onChange) return;

    const priceGte = +values.salePrice_gte;
    const priceLte = +values.salePrice_lte;
    if (
      !Number.isFinite(priceGte) ||
      !Number.isFinite(priceLte) ||
      priceGte < 0 ||
      priceGte >= priceLte
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
          placeholder="0 đ"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <TextField
          label="Đến"
          color="primary"
          name="salePrice_lte"
          placeholder="0 đ"
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
