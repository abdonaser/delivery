const initialState = {
  info: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOMER_INFO":
      return { ...state, info: action.payload };
    case "CLEAR_CUSTOMER_INFO":
      return {
        ...state,
        info: null,
      };
    default:
      return state;
  }
};

export default customerReducer;
