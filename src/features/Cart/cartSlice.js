import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowMiniCart: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMiniCart(state) {
      state.isShowMiniCart = true;
    },

    hideMiniCart(state) {
      state.isShowMiniCart = false;
    },

    getExistingCart(state, action) {
      const existingCart = { ...state };
      existingCart.cartItems = action.payload;
      return existingCart;
    },

    addToCart(state, action) {
      // newItem = {id, product, quantity, isActive}
      const newItem = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === newItem.id);

      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.unshift(newItem);
      }
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;

      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index >= 0) state.cartItems[index].quantity = quantity;
    },

    setActiveCartItem(state, action) {
      const { id, isActive } = action.payload;

      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index >= 0) state.cartItems[index].isActive = isActive;
    },

    changeActiveAllCartItem(state, action) {
      const isActive = action.payload;

      state.cartItems.forEach((cartItem) => {
        cartItem.isActive = isActive;
      });
    },

    removeFromCart(state, action) {
      const idToRemove = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== idToRemove
      );
    },

    removeCartItemsActive(state) {
      state.cartItems = state.cartItems.filter((item) => !item.isActive);
    },

    purchaseCartItem(state) {
      state.cartItems = state.cartItems.filter((item) => !item.isActive);
    },

    resetCart(state) {
      state.cartItems = [];
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  showMiniCart,
  hideMiniCart,
  getExistingCart,
  addToCart,
  setQuantity,
  setActiveCartItem,
  changeActiveAllCartItem,
  removeFromCart,
  removeCartItemsActive,
  purchaseCartItem,
  resetCart,
} = actions;

export default reducer;
