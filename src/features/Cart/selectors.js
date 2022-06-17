import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

// Get all active cart items
const activeCartItemsSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.filter((item) => item.isActive)
);

// Count number of products in cart
const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total price of cart
const cartTotalPriceSelector = createSelector(
  activeCartItemsSelector,
  (activeCartItem) =>
    activeCartItem.reduce(
      (total, item) => total + item.product.salePrice * item.quantity,
      0
    )
);

// Calculate promotion price of cart
const cartTotalPromotionSelector = createSelector(
  activeCartItemsSelector,
  (activeCartItem) =>
    activeCartItem.reduce(
      (total, item) =>
        total +
        (item.product.originalPrice - item.product.salePrice) * item.quantity,
      0
    )
);

// Calculate provisional price of cart
const cartTotalProvisionalSelector = createSelector(
  activeCartItemsSelector,
  (activeCartItem) =>
    activeCartItem.reduce(
      (total, item) => total + item.product.originalPrice * item.quantity,
      0
    )
);

export {
  activeCartItemsSelector,
  cartItemsCountSelector,
  cartTotalPriceSelector,
  cartTotalPromotionSelector,
  cartTotalProvisionalSelector,
};
