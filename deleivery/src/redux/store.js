import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./reducers";
import cartReducer from "./reducers";
import authReducer from "./authSlice";
import customerReducer from "./customerReducer";

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    cart: cartReducer,
    auth: authReducer,
    customer: customerReducer,
  },
});

export default store;
