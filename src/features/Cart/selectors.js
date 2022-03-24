import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

// Count number of products in cart
const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

// Calculate total price of cart
const cartTotalPriceSelector = createSelector(cartItemsSelector, (cartItems) =>
  cartItems
    .filter((item) => item.isActive)
    .reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);

// Calculate promotion price of cart
const cartTotalPromotionSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems
      .filter((item) => item.isActive)
      .reduce(
        (total, item) =>
          total +
          (item.product.originalPrice - item.product.salePrice) * item.quantity,
        0
      )
);

// Calculate provisional price of cart
const cartTotalProvisionalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems
      .filter((item) => item.isActive)
      .reduce(
        (total, item) => total + item.product.originalPrice * item.quantity,
        0
      )
);

// Calculate total of cart items active
const cartTotalActiveSelector = createSelector(
  cartItemsSelector,
  (cartItems) => cartItems.filter((item) => item.isActive).length
);

export {
  cartItemsCountSelector,
  cartTotalPriceSelector,
  cartTotalPromotionSelector,
  cartTotalProvisionalSelector,
  cartTotalActiveSelector,
};
