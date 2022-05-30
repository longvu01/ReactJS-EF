import { Box, Container, Grid } from '@mui/material';
import categoryApi from 'api/categoryApi';
import classNames from 'classnames/bind';
import Sidebar from 'components/Layouts/Sidebar';
import SlickList from 'components/Layouts/SlickList';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
const cx = classNames.bind(styles);

function HomePage(props) {
  const [loadingCate, setLoadingCate] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  // Fetch data
  useEffect(() => {
    // Categories
    const fetchDataCategories = async () => {
      try {
        const list = await categoryApi.getAll();
        const listCategoryMap = list.map(({ id, name }) => ({ id, name }));

        setCategoryList(listCategoryMap);
      } catch (error) {
        console.log('Failed to fetch category list: ', error);
      }

      setLoadingCate(false);
    };

    fetchDataCategories();
  }, []);

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item>
            <div className={cx('side-bar')}>
              <Sidebar data={categoryList} />
            </div>
          </Grid>
        </Grid>

        <Grid container className={cx('content')}>
          {categoryList.map((category) => (
            <SlickList key={category.id} category={category} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
