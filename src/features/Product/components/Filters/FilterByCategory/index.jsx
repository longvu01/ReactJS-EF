import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import categoryApi from 'api/categoryApi';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FilterSkeletonList from '../../skeletonLoading/FilterSkeletonList';
import styles from './FilterByCategory.module.scss';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  activeCategoryId: PropTypes.number,
};

function FilterByCategory({ onChange, activeCategoryId }) {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(list.map((item) => ({ id: item.id, name: item.name })));
      } catch (error) {
        console.log('Failed to fetch category list: ', error);
      }
      //
      setLoading(false);
    })();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (onChange) onChange(categoryId);
  };

  return (
    <Box className={styles.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        <FilterSkeletonList length={categoryList.length || 10} />
      ) : (
        <nav aria-label="secondary mailbox folders">
          <List>
            {categoryList.map((category) => (
              <ListItem
                className={classNames({
                  [styles.active]: category.id === activeCategoryId,
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
        </nav>
      )}
    </Box>
  );
}

export default FilterByCategory;
