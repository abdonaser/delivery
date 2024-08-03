export const setCustomerInfo = (user) => ({
  type: "SET_CUSTOMER_INFO",
  payload: user,
});

export const clearCustomerInfo = () => ({
  type: "CLEAR_CUSTOMER_INFO",
});

export const setRestaurantName = (name) => ({
  type: "SET_RESTAURANT_NAME",
  payload: name,
});

// export const setSelectedRestaurant = (restaurant) => ({
//   type: "SET_SELECTED_RESTAURANT",
//   payload: restaurant,
// });

export const addToCart = (item, quantity,userId) => ({
  type: "ADD_TO_CART",
  payload: {
    ...item,
    quantity,
    userId,
  },
});

export const removeFromCart = (id) => ({
  type: "REMOVE_FROM_CART",
  payload: id,
});

export const updateQuantity = (id, quantity) => ({
  type: "UPDATE_QUANTITY",
  payload: { id, quantity },
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const increaseQuantity = (id) => ({
  type: "INCREASE_QUANTITY",
  payload: id,
});

export const decreaseQuantity = (id) => ({
  type: "DECREASE_QUANTITY",
  payload: id,
});

// Action to set selected restaurant
export const setSelectedRestaurant = (restaurant) => ({
  type: SET_SELECTED_RESTAURANT,
  payload: restaurant,
});

// Action to clear selected restaurant
export const clearSelectedRestaurant = () => ({
  type: CLEAR_SELECTED_RESTAURANT,
});

// Actions for fetching restaurant data
export const fetchRestaurantRequest = () => ({
  type: FETCH_RESTAURANT_REQUEST,
});

export const fetchRestaurantSuccess = (restaurant) => ({
  type: FETCH_RESTAURANT_SUCCESS,
  payload: restaurant,
});

export const fetchRestaurantFailure = (error) => ({
  type: FETCH_RESTAURANT_FAILURE,
  payload: error,
});

export const fetchRestaurantData = (id) => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANT_REQUEST });
  try {
    const [restaurantResponse, menuResponse] = await Promise.all([
      fetch(`http://localhost:3000/restaurants/${id}`),
      fetch(`http://localhost:3000/restaurants/${id}/menu`),
    ]);

    if (!restaurantResponse.ok || !menuResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const restaurantData = await restaurantResponse.json();
    const menuData = await menuResponse.json();

    dispatch({
      type: FETCH_RESTAURANT_SUCCESS,
      payload: { restaurant: restaurantData, menu: menuData.menu },
    });
  } catch (error) {
    dispatch({
      type: FETCH_RESTAURANT_FAILURE,
      payload: error.message,
    });
  }
};

export const SET_SELECTED_RESTAURANT = "SET_SELECTED_RESTAURANT";
export const CLEAR_SELECTED_RESTAURANT = "CLEAR_SELECTED_RESTAURANT";
export const FETCH_RESTAURANT_REQUEST = "FETCH_RESTAURANT_REQUEST";
export const FETCH_RESTAURANT_SUCCESS = "FETCH_RESTAURANT_SUCCESS";
export const FETCH_RESTAURANT_FAILURE = "FETCH_RESTAURANT_FAILURE";
