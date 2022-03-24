import { Box, Container, Grid, Paper, Skeleton } from '@mui/material';
import React from 'react';
import styles from './ProductSkeleton.module.scss';

function ProductSkeleton(props) {
  return (
    <Box className={styles.root}>
      <Container>
        <Paper elevation={0}>
          {/* Breadcrumbs */}
          <Skeleton variant="text" animation="wave" width="50%" />

          <Grid container>
            {/* Left */}
            <Grid item className={styles.left}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Grid>

            {/* Right */}
            <Grid item className={styles.right}>
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item key={index} xs={12}>
                  <Box padding={1}>
                    <Skeleton variant="text" animation="wave" />
                  </Box>
                </Grid>
              ))}
              <Box className={styles.formSkeleton}>
                <Box width="60%">
                  {Array.from(new Array(3)).map((_, index) => (
                    <Grid item key={index} xs={12}>
                      <Box padding={1}>
                        <Skeleton variant="text" animation="wave" />
                      </Box>
                    </Grid>
                  ))}
                </Box>
                <Skeleton variant="rectangular" width="30%" height={200} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Product Menu */}
        {Array.from(new Array(12)).map((_, index) => (
          <Grid item key={index} xs={12}>
            <Box padding={1}>
              <Skeleton variant="text" animation="wave" />
            </Box>
          </Grid>
        ))}
      </Container>
    </Box>
  );
}

export default ProductSkeleton;
