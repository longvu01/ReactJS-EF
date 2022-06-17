import { Box } from '@mui/material';
import NotFound from 'components/Common/NotFound/index.jsx';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage/index.jsx';
import ListPage from './pages/ListPage.jsx';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Box pt={4}>
      <Routes>
        <Route index element={<ListPage />} />
        <Route path=":productId/*" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default ProductFeature;
