import { Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    onChange?.(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      centered
      onChange={handleSortChange}
      textColor="primary"
      aria-label="sort price"
    >
      <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá cao xuống thấp" value="salePrice:DESC"></Tab>
      <Tab label="Hàng mới" value="updated_at:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
