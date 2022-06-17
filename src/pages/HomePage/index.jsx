import { Box, Container, Grid } from '@mui/material';
import categoryApi from 'api/categoryApi';
import classNames from 'classnames/bind';
import Sidebar from 'components/Layouts/Sidebar';
import SidebarSkeleton from 'components/Layouts/SidebarSkeleton';
import SlickList from 'components/Layouts/SlickList';
import SlickListSkeleton from 'components/Layouts/SlickListSkeleton';
import banner1 from 'imgs/banner1.jpg';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

function HomePage(props) {
  const [loadingCate, setLoadingCate] = useState(true);
  const [categories, setCategories] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  // Fetch data
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        const listCategoryMap = list.map(({ id, name, products }) => ({
          id,
          name,
          products,
        }));

        setCategories(listCategoryMap);
      } catch (error) {
        enqueueSnackbar(`Failed to fetch data: ${error}`, {
          variant: 'error',
        });
      }

      setLoadingCate(false);
    })();
  }, [enqueueSnackbar]);

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
