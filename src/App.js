import NotFound from 'components/Common/NotFound';
import GlobalStyles from 'components/GlobalStyles';
import AlbumFeature from 'features/Album';
import CartFeature from 'features/Cart';
import Counter from 'features/Counter';
import ProductFeature from 'features/Product';
import HomePage from 'pages/HomePage';
import MainPage from 'pages/MainPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoFeature from './features/Todo/';

function App() {
  return (
    <GlobalStyles>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          <Route path="todos/*" element={<TodoFeature />} />
          <Route path="albums" element={<AlbumFeature />} />
          <Route path="products/*" element={<ProductFeature />} />
          <Route path="cart" element={<CartFeature />} />
          <Route path="counter" element={<Counter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </GlobalStyles>
  );
}

export default App;
