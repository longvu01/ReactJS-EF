import { Box, Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ProductItem from '../ProductItem';

ProductList.propTypes = {
  data: PropTypes.array,
  onReset: PropTypes.func,
};

ProductList.defaultProps = {
  data: [],
};

function ProductList({ data, onReset }) {
  const isEmpty = data.length === 0;

  const handleClickReset = () => {
    onReset?.();
  };

  return (
    <>
      {!isEmpty ? (
        <Box>
          <Grid container spacing={2}>
            {data.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            mx: 'auto',
            p: 1,
            m: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3">Không có kết quả phù hợp</Typography>
          <Button onClick={handleClickReset}>Quay lại</Button>
        </Box>
      )}
    </>
  );
}

export default ProductList;
