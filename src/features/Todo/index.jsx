import NotFound from 'components/Common/NotFound';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const rdNum = Math.trunc(Math.random() * 100);

  return (
    <div style={{ padding: 24 }}>
      TODO SHARED UI
      <br />
      <Link to={`${rdNum}`}>Detail page with random number</Link>
      <Routes>
        <Route index element={<ListPage />} />
        <Route path=":todoId" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default TodoFeature;
