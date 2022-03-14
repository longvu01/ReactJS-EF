import { Box, Grid, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './PaginationSkeleton.module.scss';

PaginationSkeleton.propTypes = {
  length: PropTypes.number,
};

PaginationSkeleton.defaultProps = {
  length: 6,
};

function PaginationSkeleton({ length }) {
  return (
    <Box>
      <Grid container className={styles.pagination}>
        {Array.from(new Array(length)).map((_, index) => (
          <Grid item key={index} xs={2}>
            <Skeleton variant="circular" width={25} height={25} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PaginationSkeleton;
