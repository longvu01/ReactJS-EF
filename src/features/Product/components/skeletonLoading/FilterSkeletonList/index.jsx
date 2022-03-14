import { Box, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

FilterSkeletonList.propTypes = {
  length: PropTypes.number,
};

FilterSkeletonList.defaultProps = {
  length: 10,
};

function FilterSkeletonList({ length }) {
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

export default FilterSkeletonList;
