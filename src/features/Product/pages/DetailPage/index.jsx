import HomeIcon from '@mui/icons-material/Home';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { addToCart } from 'features/Cart/cartSlice';
import AddToCardForm from 'features/Product/components/AddToCardForm';
import ProductAdditional from 'features/Product/components/ProductAdditional';
import ProductCardDemo from 'features/Product/components/ProductCardDemo';
import ProductDescription from 'features/Product/components/ProductDescription';
import ProductInfo from 'features/Product/components/ProductInfo';
import ProductMenu from 'features/Product/components/ProductMenu';
import ProductReview from 'features/Product/components/ProductReview';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import styles from './DetailPage.module.scss';

function DetailPage(props) {
  const { productId } = useParams();
  const { product, loading } = useProductDetail(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box className={styles.loading}>
        <LinearProgress></LinearProgress>
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
  };

  return (
    <div>
      <Box className={styles.root}>
        <Container>
          <Paper elevation={0}>
            <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
              <Link to="/">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Trang chủ
              </Link>

              <Link to="/products">Danh mục</Link>

              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Grid container>
              <Grid item className={styles.left}>
                <ProductThumbnail product={product} />
              </Grid>

              <Grid item className={styles.right}>
                <ProductInfo product={product} />
                <Box className={styles.form}>
                  <AddToCardForm onSubmit={handleAddToCartSubmit} />
                  <ProductCardDemo product={product} />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <ProductMenu />
          <Routes>
            <Route path="" element={<ProductDescription product={product} />} />
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
    </div>
  );
}

export default DetailPage;
