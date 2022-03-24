const getExistingCartStorage = () => {
  const { id } = JSON.parse(localStorage.getItem('user'));
  return JSON.parse(localStorage.getItem(`user-cart-${id}`));
};

const saveCartToStorage = (cartItems) => {
  const { id } = JSON.parse(localStorage.getItem('user'));
  localStorage.setItem(`user-cart-${id}`, JSON.stringify(cartItems));
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

  const index = cartData.findIndex((item) => item.id === id);

  if (index >= 0) cartData[index].quantity = quantity;

  saveCartToStorage(cartData);
};

const setCartItemStorageActive = (id, isActive) => {
  let cartData = getExistingCartStorage();

  const index = cartData.findIndex((item) => item.id === id);

  if (index >= 0) cartData[index].isActive = isActive;

  saveCartToStorage(cartData);
};

const setAllCartItemStorageActive = (isActive) => {
  let cartData = getExistingCartStorage();

  cartData.forEach((item) => {
    item.isActive = isActive;
  });

  saveCartToStorage(cartData);
};

const removeFromCartStorage = (id) => {
  let cartData = getExistingCartStorage();

  cartData = cartData.filter((item) => item.id !== id);

  saveCartToStorage(cartData);
};

const removeCartItemStorageActive = (id) => {
  let cartData = getExistingCartStorage();

  cartData = cartData.filter((item) => item.isActive !== true);

  saveCartToStorage(cartData);
};

const purchaseCartItems = () => {
  let cartData = getExistingCartStorage();

  const purchaseCart = cartData.filter((item) => item.isActive);
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
