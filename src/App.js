import NotFound from 'components/Common/NotFound';
import GlobalStyles from 'components/GlobalStyles';
import AlbumFeature from 'features/Album';
import CartFeature from 'features/Cart';
import Counter from 'features/Counter';
import ProductFeature from 'features/Product';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Common/Header';
import TodoFeature from './features/Todo/';

function App() {
  return (
    <GlobalStyles>
      <div className="app">
        <Header />

        <Routes>
          {/* <Route path="/" element={<Navigate to="/products" />} /> */}
          <Route path="/" />
          <Route path="/todos/*" element={<TodoFeature path="/todos" />} />
          <Route path="/albums" element={<AlbumFeature />} />
          <Route path="/products/*" element={<ProductFeature />} />
          <Route path="/cart" element={<CartFeature />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GlobalStyles>
  );
}

export default App;
