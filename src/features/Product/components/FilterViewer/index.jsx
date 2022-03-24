import { Chip } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { formatCurrency } from 'utils';
import styles from './FilterViewer.module.scss';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
  categoryActive: PropTypes.string,
};

function FilterViewer({ filters = {}, onChange = null, categoryActive = '' }) {
  const FILTER_LIST = useMemo(() => {
    return [
      {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
          if (filters.isFreeShip) delete filters.isFreeShip;
          else filters.isFreeShip = true;

          return filters;
        },
      },
      {
        id: 2,
        getLabel: () => categoryActive,
        isActive: () => Boolean(categoryActive),
        isVisible: () => Boolean(categoryActive),
        isRemovable: true,
        onRemove: (filters) => {
          delete filters['category.id'];
          return filters;
        },
        onToggle: () => {},
      },
      {
        id: 3,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
          delete filters.isPromotion;
          return filters;
        },
        onToggle: () => {},
      },
      {
        id: 4,
        getLabel: (filters) => `\`${filters['category.searchTerm']}\``,
        isActive: () => true,
        isVisible: (filters) => filters['category.searchTerm'],
        isRemovable: true,
        onRemove: (filters) => {
          delete filters['category.searchTerm'];
          return filters;
        },
        onToggle: () => {},
      },
      {
        id: 5,
        getLabel: (filters) =>
          `Từ ${formatCurrency(filters.salePrice_gte)} đến ${formatCurrency(
            filters.salePrice_lte
          )}`,
        isActive: () => true,
        isVisible: (filters) => {
          const gte = +filters.salePrice_gte;
          const lte = +filters.salePrice_lte;
          return (
            Number.isFinite(gte) &&
            Number.isFinite(lte) &&
            gte >= 0 &&
            lte > gte
          );
        },
        isRemovable: true,
        onRemove: (filters) => {
          delete filters.salePrice_gte;
          delete filters.salePrice_lte;
          return filters;
        },
        onToggle: () => {},
      },
    ];
  }, [categoryActive]);

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((item) => item.isVisible(filters));
  }, [filters, FILTER_LIST]);

  // Handlers
  const handleToggleFilter = (filterItem) => {
    if (!onChange) return;

    const newFilters = filterItem.onToggle(filters);
    onChange(newFilters);
  };

  const handleRemoveFilter = (filterItem) => {
    if (!onChange) return;

    const newFilters = filterItem.onRemove(filters);
    onChange(newFilters);
  };

  return (
    <Box component="ul" className={styles.root}>
      <Chip label="EZ SHOP" color="secondary" className={styles.chipMain} />
      {visibleFilters.map((item) => (
        <li key={item.id}>
          <Chip
            label={item.getLabel(filters)}
            color={item.isActive(filters) ? 'primary' : 'default'}
            clickable={!item.isRemovable}
            onClick={item.isRemovable ? null : () => handleToggleFilter(item)}
            onDelete={item.isRemovable ? () => handleRemoveFilter(item) : null}
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
