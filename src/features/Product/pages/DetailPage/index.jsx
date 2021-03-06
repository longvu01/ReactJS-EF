import HomeIcon from '@mui/icons-material/Home';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import LinearProgressLoading from 'components/Common/LinearProgressLoading';
import NotFound from 'components/Common/NotFound';
import { setRequireLogin } from 'features/Auth/userSlice';
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
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { addItemToCartStorage } from 'utils';
import styles from './DetailPage.module.scss';

function DetailPage(props) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { product, loading, error } = useProductDetail(productId);
  const categoryId = product?.category?.id;
  const categoryName = product?.category?.name;

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = Boolean(loggedInUser.id);
  const dispatch = useDispatch();

  const handleAddToCartSubmit = ({ quantity }) => {
    if (!isLoggedIn) {
      dispatch(setRequireLogin());
      return;
    }

    const newCartItem = {
      id: +productId,
      product,
      quantity,
      isActive: false,
    };

    dispatch(showMiniCart());
    dispatch(addToCart(newCartItem));

    /* Add cart item */
    addItemToCartStorage(newCartItem);
  };

  if (error) return <NotFound />;

  return (
    <Box>
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
                <Button
                  sx={{ display: 'flex', alignItems: 'center' }}
                  onClick={() => navigate('/')}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Trang ch???
                </Button>

                <Button onClick={() => navigate('..')}>Danh m???c</Button>

                {categoryId && categoryName && (
                  <Button
                    onClick={() => navigate(`../?category.id=${categoryId}`)}
                  >
                    {categoryName}
                  </Button>
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

            {/* Menu links */}
            <ProductMenu />

            {/* Routes */}
            <Routes>
              <Route
                index
                element={
                  <ProductDescription description={product.description} />
                }
              />
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
    </Box>
  );
}

export default DetailPage;
