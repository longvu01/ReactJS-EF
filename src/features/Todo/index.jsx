import NotFound from 'components/Common/NotFound';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  return (
    <div>
      TODO SHARED UI
      <br />
      <Link to="123">Detail 123</Link>
      <Routes>
        <Route index element={<ListPage />} />
        <Route path=":todoId" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default TodoFeature;
