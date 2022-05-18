const getExistingCartStorage = () => {
  const userStorage = JSON.parse(localStorage.getItem('user'));

  if (!userStorage) return;

  return JSON.parse(localStorage.getItem(`user-cart-${userStorage.id}`));
};

const saveCartToStorage = (cartItems) => {
  const userStorage = JSON.parse(localStorage.getItem('user'));

  if (!userStorage) return;

  localStorage.setItem(
    `user-cart-${userStorage.id}`,
    JSON.stringify(cartItems)
  );
};

const addItemToCartStorage = (cartItems) => {
  let cartData = getExistingCartStorage();

  if (!cartData) {
    /* Init cart with empty array */
    saveCartToStorage([]);
    cartData = getExistingCartStorage();
  }

  const index = cartData.findIndex((item) => item.id === cartItems.id);
  if (index >= 0) {
    cartData[index].quantity += cartItems.quantity;
  } else {
    cartData.push(cartItems);
  }

  saveCartToStorage(cartData);
};

const setQuantityCartItem = (id, quantity) => {
  let cartData = getExistingCartStorage();

  if (!cartData) return;

  const index = cartData.findIndex((item) => item.id === id);

  if (index >= 0) cartData[index].quantity = quantity;

  saveCartToStorage(cartData);
};

const setCartItemStorageActive = (id, isActive) => {
  let cartData = getExistingCartStorage();

  if (!cartData) return;

  const index = cartData.findIndex((item) => item.id === id);

  if (index >= 0) cartData[index].isActive = isActive;

  saveCartToStorage(cartData);
};

const setAllCartItemStorageActive = (isActive) => {
  let cartData = getExistingCartStorage();

  if (!cartData) return;

  cartData.forEach((item) => {
    item.isActive = isActive;
  });

  saveCartToStorage(cartData);
};

const removeFromCartStorage = (id) => {
  let cartData = getExistingCartStorage();

  if (!cartData) return;

  cartData = cartData.filter((item) => item.id !== id);

  saveCartToStorage(cartData);
};

const removeCartItemStorageActive = (id) => {
  let cartData = getExistingCartStorage();

  if (!cartData) return;

  cartData = cartData.filter((item) => item.isActive !== true);

  saveCartToStorage(cartData);
};

const purchaseCartItems = () => {
  let cartData = getExistingCartStorage();

  if (!cartData) return;

  const purchaseCart = cartData
    .filter((item) => item.isActive)
    .map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
  cartData = cartData.filter((item) => !item.isActive);

  console.log('purchaseCart localStorage', purchaseCart);
  saveCartToStorage(cartData);
};

export {
  getExistingCartStorage,
  saveCartToStorage,
  addItemToCartStorage,
  setQuantityCartItem,
  setCartItemStorageActive,
  setAllCartItemStorageActive,
  removeFromCartStorage,
  removeCartItemStorageActive,
  purchaseCartItems,
};
