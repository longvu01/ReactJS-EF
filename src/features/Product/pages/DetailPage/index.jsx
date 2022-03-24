import HomeIcon from '@mui/icons-material/Home';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import LinearProgressLoading from 'components/Common/LinearProgressLoading';
import NotFound from 'components/Common/NotFound';
import { addToCart, showMiniCart } from 'features/Cart/cartSlice';
import AddToCartForm from 'features/Product/components/AddToCartForm';
import ProductAdditional from 'features/Product/components/ProductAdditional';
import ProductCardDemo from 'features/Product/components/ProductCardDemo';
import ProductDescription from 'features/Product/components/ProductDescription';
import ProductInfo from 'features/Product/components/ProductInfo';
import ProductMenu from 'features/Product/components/ProductMenu';
import ProductReview from 'features/Product/components/ProductReview';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import ProductSkeleton from 'features/Product/components/skeletonLoading/ProductSkeleton';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { addItemToCartStorage } from 'utils';
import styles from './DetailPage.module.scss';

function DetailPage(props) {
  const [errorFetch, setErrorFetch] = useState(null);

  const { productId } = useParams();
  const { product, loading, error } = useProductDetail(productId);
  const categoryId = product?.category?.id;
  const categoryName = product?.category?.name;

  const dispatch = useDispatch();

  const handleAddToCartSubmit = ({ quantity }) => {
    const newCartItem = {
      id: product.id,
      product,
      quantity,
      isActive: false,
    };

    dispatch(showMiniCart());
    dispatch(addToCart(newCartItem));

    /* Add cart item */
    addItemToCartStorage(newCartItem);
  };

  useEffect(() => {
    setErrorFetch(error);
  }, [error]);

  if (errorFetch) {
    return <NotFound />;
  }

  return (
    <>
      {loading ? (
        <>
          <LinearProgressLoading />
          <ProductSkeleton />
        </>
      ) : (
        <Box className={styles.root}>
          <Container>
            <Paper elevation={0}>
              {/* Breadcrumbs */}
              <Breadcrumbs
                aria-label="breadcrumb"
                className={styles.breadcrumb}
              >
                <Link to="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Trang chủ
                </Link>

                <Link to="..">Danh mục</Link>

                {categoryId && categoryName && (
                  <Link to={`../?category.id=${categoryId}`}>
                    {categoryName}
                  </Link>
                )}

                <Typography color="text.primary">{product.name}</Typography>
              </Breadcrumbs>

              <Grid container>
                {/* Left */}
                <Grid item className={styles.left}>
                  <ProductThumbnail product={product} />
                </Grid>

                {/* Right */}
                <Grid item className={styles.right}>
                  <ProductInfo product={product} />
                  <Box className={styles.form}>
                    <AddToCartForm onSubmit={handleAddToCartSubmit} />
                    <ProductCardDemo product={product} />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <ProductMenu />
            {/* Routes */}
            <Routes>
              <Route index element={<ProductDescription product={product} />} />
              <Route
                path="additional"
                element={<ProductAdditional product={product} />}
              />
              <Route
                path="reviews"
                element={<ProductReview product={product} />}
              />
            </Routes>
          </Container>
        </Box>
      )}
    </>
  );
}

export default DetailPage;
