import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './FilterByPrice.module.scss';

FilterByPrice.propTypes = {
  filters: propTypes.object,
  onChange: propTypes.func,
};

const initValues = {
  salePrice_gte: '',
  salePrice_lte: '',
};

function FilterByPrice({ filters, onChange, onReset }) {
  const { salePrice_gte, salePrice_lte } = filters;

  const [values, setValues] = useState(() => {
    if (salePrice_gte && salePrice_lte) return { salePrice_gte, salePrice_lte };
    return initValues;
  });

  const { enqueueSnackbar } = useSnackbar();

  // if filters change
  useEffect(() => {
    if (salePrice_gte && salePrice_lte) {
      setValues({ salePrice_gte, salePrice_lte });
    } else {
      setValues(initValues);
    }
  }, [filters, salePrice_gte, salePrice_lte]);

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
    onReset?.();
  };

  return (
    <Box className={styles.root}>
      <Typography variant="subtitle2" sx={{ paddingBottom: 1 }}>
        CHỌN KHOẢNG GIÁ
      </Typography>

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
