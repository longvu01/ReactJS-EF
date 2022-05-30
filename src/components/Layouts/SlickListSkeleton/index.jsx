import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

function SlickListSkeleton({ length = 5 }) {
  return (
    <Box sx={{ width: '100%', marginBottom: '24px' }}>
      <Grid container>
        {Array.from(new Array(length)).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={12 / length}>
            <Box padding={1}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SlickListSkeleton;
