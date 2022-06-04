import { Box, Container, Grid } from '@mui/material';
import categoryApi from 'api/categoryApi';
import classNames from 'classnames/bind';
import Sidebar from 'components/Layouts/Sidebar';
import SidebarSkeleton from 'components/Layouts/SidebarSkeleton';
import SlickList from 'components/Layouts/SlickList';
import SlickListSkeleton from 'components/Layouts/SlickListSkeleton';
import { BANNERS } from 'constants';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HomePage.module.scss';
import { setCategories } from './productSlice';
import banner1 from 'imgs/banner1.jpg';

const cx = classNames.bind(styles);

function HomePage(props) {
  const [loadingCate, setLoadingCate] = useState(true);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);

  const fetchDataCategories = useCallback(() => {
    const fetch = async () => {
      try {
        const list = await categoryApi.getAll();
        const listCategoryMap = list.map(({ id, name, products }) => ({
          id,
          name,
          products,
        }));

        dispatch(setCategories(listCategoryMap));
      } catch (error) {
        console.log('Failed to fetch category list: ', error);
      }

      setLoadingCate(false);
    };

    fetch();
  }, [dispatch]);

  // Fetch data
  useEffect(() => {
    if (categories.length === 0) fetchDataCategories();
    else setLoadingCate(false);
  }, [categories, fetchDataCategories]);

  return (
    <Box className={cx('root')}>
      <Container maxWidth="lg">
        <Grid container spacing={1} sx={{ flexWrap: 'nowrap' }}>
          <Grid item>
            <div className={cx('side-bar')}>
              {loadingCate ? (
                <SidebarSkeleton length={6} />
              ) : (
                <Sidebar categories={categories} />
              )}
            </div>
          </Grid>
          <Grid item className={cx('bannerBox')}>
            <div className={cx('banner')}>
              <img src={banner1} alt="banner1" />
            </div>
          </Grid>
        </Grid>

        <Grid container className={cx('content')}>
          {loadingCate ? (
            <>
              <SlickListSkeleton length={5} />
              <SlickListSkeleton length={5} />
              <SlickListSkeleton length={5} />
              <SlickListSkeleton length={5} />
              <SlickListSkeleton length={5} />
            </>
          ) : (
            <>
              {categories.map((category) => (
                <SlickList key={category.id} category={category} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
