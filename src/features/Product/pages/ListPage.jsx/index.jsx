import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import productApi from 'api/productApi';
import classnames from 'classnames';
import FilterViewer from 'features/Product/components/FilterViewer';
import ProductFilters from 'features/Product/components/ProductFilters';
import ProductList from 'features/Product/components/ProductList';
import ProductSort from 'features/Product/components/ProductSort';
import PaginationSkeleton from 'features/Product/components/skeletonLoading/PaginationSkeleton';
import ProductSkeletonList from 'features/Product/components/skeletonLoading/ProductSkeletonList';
import queryString from 'query-string';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './ListPage.module.scss';

ListPage.propTypes = {};

function ListPage(props) {
  const initFilters = {
    _page: 1,
    _limit: 12,
    _sort: 'salePrice:ASC',
  };
  const initPagination = {
    page: 1,
    limit: 12,
    total: 10,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: +params._page || initFilters._page,
      _limit: +params._limit || initFilters._limit,
      _sort: params._sort || initFilters._sort,
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(initPagination);
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: +queryParams._page || initFilters._page,
  //   _limit: +queryParams._limit || initFilters._limit,
  //   _sort: queryParams._sort || initFilters._sort,
  // }));

  const countPagination = Math.ceil(pagination.total / pagination.limit);
  const currentPage = pagination.page;

  // Sync filters to URL
  // useEffect(() => {
  //   setSearchParams(queryString.stringify(filters));
  // }, [filters]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    };
    if (mounted) fetchData();

    return () => {
      mounted = false;
    };
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };
    setSearchParams(queryString.stringify(filters));
  };

  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    setSearchParams(queryString.stringify(filters));
  };

  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    setSearchParams(queryString.stringify(filters));
  };

  const handleResetFilters = () => {
    setSearchParams(queryString.stringify(initFilters));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classnames(styles.left)}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </Paper>
          </Grid>

          <Grid item className={styles.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer
                filters={queryParams}
                onChange={handleFiltersChange}
              />
              {/*  */}
              {loading ? (
                <>
                  <ProductSkeletonList length={12} />
                  <PaginationSkeleton length={6} />
                </>
              ) : (
                <>
                  <ProductList
                    data={productList}
                    onReset={handleResetFilters}
                  />
                  <Box className={styles.pagination}>
                    <Pagination
                      count={countPagination}
                      color="primary"
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
