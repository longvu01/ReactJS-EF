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
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './ListPage.module.scss';

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

function ListPage(props) {
  const location = useLocation();

  const { enqueueSnackbar } = useSnackbar();

  const [categoryActive, setCategoryActive] = useState('');

  const [loadingList, setLoadingList] = useState(true);
  const [loadingCate, setLoadingCate] = useState(true);

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [pagination, setPagination] = useState(initPagination);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const paramsParse = queryString.parse(location.search);
    const categorySearchTerm = location.state?.searchTerm;

    const params = {
      ...paramsParse,
      _page: +paramsParse._page || initFilters._page,
      _limit: +paramsParse._limit || initFilters._limit,
      _sort: paramsParse._sort || initFilters._sort,
      // isPromotion: paramsParse.isPromotion === 'true',
      // isFreeShip: paramsParse.isFreeShip === 'true',
      ...(paramsParse.isPromotion === 'true' && {
        isPromotion: true,
      }),
      ...(paramsParse.isFreeShip === 'true' && {
        isFreeShip: true,
      }),
      ...(categorySearchTerm && {
        'category.searchTerm': categorySearchTerm,
      }),
    };

    if (!paramsParse['category.searchTerm'])
      delete params['category.searchTerm'];
    return params;
  }, [location.search, location.state?.searchTerm]);

  const countPagination = Math.ceil(pagination.total / pagination.limit);
  const currentPage = pagination.page;

  // Set search params if search from another page
  useEffect(() => {
    const categorySearchTerm = location.state?.searchTerm;
    if (categorySearchTerm) {
      setSearchParams({
        'category.searchTerm': categorySearchTerm,
      });
    }
  }, [location.state?.searchTerm, setSearchParams]);

  // Fetch data
  useEffect(() => {
    // List + pagination
    const fetchDataProductsAndPagination = async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);

        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        enqueueSnackbar(`Failed to fetch product list: ${error}`, {
          variant: 'error',
        });
      }

      setLoadingList(false);
    };

    // Categories
    const fetchDataCategories = async () => {
      try {
        const list = await categoryApi.getAll();
        const listCategoryMap = list.map(({ id, name }) => ({ id, name }));

        setCategoryList(listCategoryMap);

        const categoryActiveId = queryParams['category.id'];
        if (categoryActiveId) {
          const categoryActive = listCategoryMap.find(
            (item) => item.id === +categoryActiveId
          );

          setCategoryActive(categoryActive.name);
        }
      } catch (error) {
        enqueueSnackbar(`Failed to fetch category list: ${error}`, {
          variant: 'error',
        });
      }

      setLoadingCate(false);
    };

    fetchDataProductsAndPagination();
    fetchDataCategories();
  }, [queryParams, enqueueSnackbar]);

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

  const handleViewerChange = (newFilters, isReset = false) => {
    if (isReset) {
      setSearchParams(queryString.stringify(initFilters));
      setCategoryActive('');
      return;
    }

    const filters = {
      ...newFilters,
      _page: 1,
    };

    if (!filters['category.id']) setCategoryActive('');

    setSearchParams(queryString.stringify(filters));
  };

  const handleFiltersChange = (newFilters, isCateChange = false) => {
    const prevFilters = isCateChange ? initFilters : queryParams;

    const filters = {
      ...prevFilters,
      ...newFilters,
      _page: 1,
    };

    // Set active category
    const categoryActiveId = queryParams['category.id'];
    if (categoryActiveId) {
      const categoryActive = categoryList.find(
        (item) => item.id === +categoryActiveId
      );
      setCategoryActive(categoryActive.name);
    }

    // delete unneeded filters
    Object.entries(filters).forEach(([key, val]) => {
      if (!val) delete filters[key];
    });

    setSearchParams(queryString.stringify(filters));
  };

  const handleResetFilters = (isResetPriceRange = false) => {
    if (isResetPriceRange) {
      const filters = {
        ...queryParams,
        _page: 1,
      };

      delete filters.salePrice_gte;
      delete filters.salePrice_lte;

      setSearchParams(queryString.stringify(filters));
      return;
    }

    setCategoryActive('');
    setSearchParams(queryString.stringify(initFilters));
  };

  return (
    <Box>
      {(loadingCate || loadingList) && <LinearProgressLoading />}
      <Container>
        <Grid container spacing={1} sx={{ flexWrap: 'nowrap' }}>
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
              {/* Show skeleton if fetching */}
              {loadingList && (
                <>
                  <ProductSkeletonList length={12} />
                  <PaginationSkeleton length={6} />
                </>
              )}
              {!loadingList && (
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
