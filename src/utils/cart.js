const getExistingCartStorage = () => {
  const userStorage = JSON.parse(localStorage.getItem('user'));

  if (!userStorage) return;

  return JSON.parse(localStorage.getItem(`user-cart-${userStorage.id}`));
};

let cartData = getExistingCartStorage() || [];
const userStorage = JSON.parse(localStorage.getItem('user'));

const saveCartToStorage = (cartItems) => {
  if (!userStorage) return;

  localStorage.setItem(
    `user-cart-${userStorage.id}`,
    JSON.stringify(cartItems)
  );
};

const addItemToCartStorage = (cartItems) => {
  const index = cartData.findIndex((item) => item.id === cartItems.id);
  if (index >= 0) {
    cartData[index].quantity += cartItems.quantity;
  } else {
    cartData.unshift(cartItems);
  }

  saveCartToStorage(cartData);
};

const setQuantityCartItemStorage = (id, quantity) => {
  if (!cartData) return;

  const index = cartData.findIndex((item) => item.id === id);

  if (index >= 0) cartData[index].quantity = quantity;

  saveCartToStorage(cartData);
};

const setCartItemStorageActive = (id, isActive) => {
  if (!cartData) return;

  const index = cartData.findIndex((item) => item.id === id);

  if (index >= 0) cartData[index].isActive = isActive;

  saveCartToStorage(cartData);
};

const setAllCartItemStorageActive = (isActive) => {
  if (!cartData) return;

  cartData.forEach((item) => {
    item.isActive = isActive;
  });

  saveCartToStorage(cartData);
};

const removeFromCartStorage = (id) => {
  if (!cartData) return;

  cartData = cartData.filter((item) => item.id !== id);

  saveCartToStorage(cartData);
};

const removeCartItemStorageActive = (id) => {
  if (!cartData) return;

  cartData = cartData.filter((item) => item.isActive !== true);

  saveCartToStorage(cartData);
};

const purchaseCartStorage = (id) => {
  if (!cartData) return;

  const purchaseCart = cartData
    .filter((item) => item.isActive)
    .map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

  cartData = cartData.filter((item) => !item.isActive);

  console.log('purchaseCart localStorage', { userId: id, purchaseCart });
  saveCartToStorage(cartData);
};

export {
  getExistingCartStorage,
  saveCartToStorage,
  addItemToCartStorage,
  setQuantityCartItemStorage,
  setCartItemStorageActive,
  setAllCartItemStorageActive,
  removeFromCartStorage,
  removeCartItemStorageActive,
  purchaseCartStorage,
};
