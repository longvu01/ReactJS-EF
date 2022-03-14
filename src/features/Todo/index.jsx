import NotFound from 'components/Common/NotFound';
import React from 'react';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  console.log(props);
  const { path } = props;
  return (
    <div>
      TODO SHARED UI
      <br />
      <Link to={`${path}/list`}>List</Link>
      <br />
      <Link to={`${path}/123`}>Detail 123</Link>
      <Routes>
        <Route path="list" element={<ListPage />} />
        <Route path=":todoId" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default TodoFeature;
