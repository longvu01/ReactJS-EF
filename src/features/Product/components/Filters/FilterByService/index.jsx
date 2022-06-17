import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import propTypes from 'prop-types';
import React from 'react';
import styles from './FilterByService.module.scss';

FilterByService.propTypes = {
  filters: propTypes.object,
  onChange: propTypes.func,
};

FilterByService.defaultProps = {
  filters: {},
};

const initService = [
  {
    value: 'isPromotion',
    label: 'Có khuyến mãi',
  },
  {
    value: 'isFreeShip',
    label: 'Vận chuyển miễn phí',
  },
];

function FilterByService({ filters, onChange }) {
  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={styles.root}>
      <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
        DỊCH VỤ
      </Typography>

      <ul className={styles.list}>
        {initService.map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters[service.value] === true}
                  color="primary"
                  onChange={handleChange}
                  name={service.value}
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
