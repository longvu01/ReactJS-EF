import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from '../Filters/FilterByCategory';
import FilterByPrice from '../Filters/FilterByPrice';
import FilterByService from '../Filters/FilterByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  categoryList: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
};

function ProductFilters({ filters, categoryList, onChange, onReset }) {
  const filterPrice = {
    salePrice_gte: +filters.salePrice_gte,
    salePrice_lte: +filters.salePrice_lte,
  };

  const handleCategoryChange = (categoryId) => {
    if (!onChange) return;

    const newFilters = {
      'category.id': categoryId,
    };
    onChange(newFilters, true);
  };

  const handleFiltersChange = (values) => {
    if (onChange) onChange(values);
  };

  const handleResetPriceRange = () => {
    if (onReset) onReset(true);
  };

  return (
    <Box>
      <FilterByCategory
        categoryList={categoryList}
        onChange={handleCategoryChange}
        activeCategoryId={filters['category.id']}
      />
      <FilterByPrice
        filters={filterPrice}
        onChange={handleFiltersChange}
        onReset={handleResetPriceRange}
      />
      <FilterByService filters={filters} onChange={handleFiltersChange} />
    </Box>
  );
}

export default ProductFilters;
