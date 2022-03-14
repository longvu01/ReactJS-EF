import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage.jsx';
import NotFound from 'components/Common/NotFound/index.jsx';
import { Box } from '@mui/material';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Box pt={4}>
      <Routes>
        <Route path="" element={<ListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </Box>
  );
}

export default ProductFeature;
