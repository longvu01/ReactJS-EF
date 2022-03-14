import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import FilterByCategory from '../Filters/FilterByCategory';
import FilterByPrice from '../Filters/FilterByPrice';
import FilterByService from '../Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
};

function ProductFilters({ filters, onChange, onReset }) {
  const activeCategoryId = useRef(null);

  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    activeCategoryId.current = newCategoryId;
    const newFilters = {
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };

  const handlePriceChange = (values, isReset = false) => {
    if (onChange) onChange(values);
    if (isReset) {
      activeCategoryId.current = null;
      onReset();
    }
  };

  return (
    <Box>
      <FilterByCategory
        onChange={handleCategoryChange}
        activeCategoryId={activeCategoryId.current}
      />
      <FilterByPrice onChange={handlePriceChange} />
      <FilterByService filters={filters} onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFilters;
