export const setRestaurantName = (name) => ({
  type: 'SET_RESTAURANT_NAME',
  payload: name,
});

export const setSelectedRestaurant = (restaurant) => ({
  type: 'SET_SELECTED_RESTAURANT',
  payload: restaurant,
});

export const addToCart = (item, quantity) => ({
  type: 'ADD_TO_CART',
  payload: { ...item, quantity }
});

export const removeFromCart = (itemId) => ({
  type: 'REMOVE_FROM_CART',
  payload: itemId
});

export const updateQuantity = (id, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { id, quantity },
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const increaseQuantity = (itemId) => ({
  type: 'INCREASE_QUANTITY',
  payload: itemId,
});

export const decreaseQuantity = (itemId) => ({
  type: 'DECREASE_QUANTITY',
  payload: itemId,
});
