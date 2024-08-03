const initialState = {
  items: [],
  restaurantId: null,
  userId: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (
        state.restaurantId &&
        state.restaurantId !== action.payload.restaurantId
      ) {
        alert(
          "You can only add items from one restaurant at a time. Please clear your cart to add items from a different restaurant."
        );
        return state;
      }

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };
        return {
          ...state,
          items: updatedItems,
          restaurantId: state.restaurantId || action.payload.restaurantId,
          userId: state.userId || action.payload.userId,
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        restaurantId: state.restaurantId || action.payload.restaurantId,
        userId: state.userId || action.payload.userId,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        restaurantId: state.items.length > 1 ? state.restaurantId : null,
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export default cartReducer;
