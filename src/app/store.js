import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';
import counterReducer from '../features/Counter/counterSlice';
import reviewReducer from '../features/Review/reviewSlice';
import productReducer from 'pages/HomePage/productSlice';

const rootReducer = {
  count: counterReducer,
  user: userReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  products: productReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
