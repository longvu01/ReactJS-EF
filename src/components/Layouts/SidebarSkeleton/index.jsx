import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

function SidebarSkeleton({ length = 6 }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((_, index) => (
          <Grid item key={index} xs={12}>
            <Box padding={1}>
              <Skeleton variant="text" animation="wave" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SidebarSkeleton;
