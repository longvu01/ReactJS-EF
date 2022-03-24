import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import categoryApi from 'api/categoryApi';
import productApi from 'api/productApi';
import classnames from 'classnames';
import LinearProgressLoading from 'components/Common/LinearProgressLoading';
import FilterViewer from 'features/Product/components/FilterViewer';
import ProductFilters from 'features/Product/components/ProductFilters';
import ProductList from 'features/Product/components/ProductList';
import ProductSort from 'features/Product/components/ProductSort';
import FilterSkeletonList from 'features/Product/components/skeletonLoading/FilterSkeletonList';
import PaginationSkeleton from 'features/Product/components/skeletonLoading/PaginationSkeleton';
import ProductSkeletonList from 'features/Product/components/skeletonLoading/ProductSkeletonList';
import queryString from 'query-string';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './ListPage.module.scss';

ListPage.propTypes = {};

function ListPage(props) {
  const location = useLocation();

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

  // const mounted = useRef(true);

  const [categoryActive, setCategoryActive] = useState('');

  const [loadingList, setLoadingList] = useState(true);
  const [loadingCate, setLoadingCate] = useState(true);

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [pagination, setPagination] = useState(initPagination);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = useMemo(() => {
    const paramsParse = queryString.parse(location.search);
    const categorySearchTerm = location.state?.searchTerm?.search;

    const params = {
      ...paramsParse,
      _page: +paramsParse._page || initFilters._page,
      _limit: +paramsParse._limit || initFilters._limit,
      _sort: paramsParse._sort || initFilters._sort,
      isPromotion: paramsParse.isPromotion === 'true',
      isFreeShip: paramsParse.isFreeShip === 'true',
      ...(categorySearchTerm && {
        ['category.searchTerm']: categorySearchTerm,
      }),
    };

    if (!paramsParse['category.searchTerm'])
      delete params['category.searchTerm'];

    return params;
  }, [location.search]);

  // Set search params if search from another page
  useEffect(() => {
    const categorySearchTerm = location.state?.searchTerm?.search;
    if (categorySearchTerm) {
      setSearchParams({ ['category.searchTerm']: categorySearchTerm });
    }
  }, []);

  const countPagination = Math.ceil(pagination.total / pagination.limit);
  const currentPage = pagination.page;

  useEffect(() => {
    // Fetch data list + pagination
    const fetchDataProductsAndPagination = async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        // if (mounted.current) {
        setProductList(data);
        setPagination(pagination);
        // }
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
      //
      // if (mounted.current) setLoadingList(false);
      setLoadingList(false);
    };

    // Fetch data category
    const fetchDataCategories = async () => {
      try {
        const list = await categoryApi.getAll();
        const listCategoryMap = list.map(({ id, name }) => ({ id, name }));
        // if (mounted.current) setCategoryList(listCategoryMap);
        setCategoryList(listCategoryMap);

        const categoryActiveId = queryParams['category.id'];
        if (categoryActiveId) {
          const categoryActive = listCategoryMap.find(
            (item) => item.id === +categoryActiveId
          );
          // if (mounted.current) setCategoryActive(categoryActive.name);
          setCategoryActive(categoryActive.name);
        }
      } catch (error) {
        console.log('Failed to fetch category list: ', error);
      }
      //
      // if (mounted.current) setLoadingCate(false);
      setLoadingCate(false);
    };

    fetchDataProductsAndPagination();
    fetchDataCategories();

    // return () => {

    // };
  }, [queryParams]);

  // Handlers
  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setSearchParams(queryString.stringify(filters));
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
      _page: 1,
    };
    setSearchParams(queryString.stringify(filters));
  };

  const handleFiltersChange = (newFilters, isResetPriceRange = true) => {
    const filters = {
      ...queryParams,
      ...newFilters,
      _page: 1,
    };

    const categoryActiveId = queryParams['category.id'];
    if (categoryActiveId) {
      const categoryActive = categoryList.find(
        (item) => item.id === +categoryActiveId
      );
      setCategoryActive(categoryActive.name);
    }

    if (isResetPriceRange) {
      delete filters.salePrice_gte;
      delete filters.salePrice_lte;
    }

    setSearchParams(queryString.stringify(filters));
  };

  const handleViewerChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
      _page: 1,
    };

    if (!filters['category.id']) setCategoryActive('');

    setSearchParams(queryString.stringify(filters));
  };

  const handleResetFilters = () => {
    setSearchParams(queryString.stringify(initFilters));
  };

  return (
    <Box>
      {(loadingCate || loadingList) && <LinearProgressLoading />}
      <Container>
        <Grid container spacing={1}>
          {/* Left side */}
          <Grid item className={classnames(styles.left)}>
            <Paper elevation={0}>
              {loadingCate ? (
                <FilterSkeletonList length={20} />
              ) : (
                <ProductFilters
                  filters={queryParams}
                  categoryList={categoryList}
                  onChange={handleFiltersChange}
                  onReset={handleResetFilters}
                />
              )}
            </Paper>
          </Grid>

          {/* Right side */}
          <Grid item className={styles.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer
                filters={queryParams}
                onChange={handleViewerChange}
                categoryActive={categoryActive}
              />
              {/*  */}
              {loadingList ? (
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
                      showFirstButton
                      showLastButton
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
