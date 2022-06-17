import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './FilterByCategory.module.scss';

FilterByCategory.propTypes = {
  categoryList: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  activeCategoryId: PropTypes.string,
};

function FilterByCategory({ categoryList, onChange, activeCategoryId = 0 }) {
  const handleCategoryClick = (categoryId) => {
    if (onChange) onChange(categoryId);
  };

  return (
    <Box className={styles.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      <List>
        {categoryList.map((category) => (
          <ListItem
            className={classNames({
              [styles.active]: category.id === +activeCategoryId,
            })}
            disablePadding
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <ListItemButton>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterByCategory;
