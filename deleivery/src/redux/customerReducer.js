// // redux/reducers/customerReducer.js
// const initialState = {
//   info: null,
// };

// const customerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_CUSTOMER_INFO':
//       return {
//         ...state,
//         info: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default customerReducer;

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {};

    default:
      return state;
  }
};

export default userReducer;
