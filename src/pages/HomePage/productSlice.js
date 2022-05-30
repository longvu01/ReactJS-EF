import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;

export const { setProducts, setCategories } = actions;

export default reducer;
