import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./resReduser";
import cartReducer from "./reducers";
import authReducer from "./authSlice";
import customerReducer from "./customerReducer";
import activeWelcomNameSlice from "./ActiveWelcomName";
const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    cart: cartReducer,
    auth: authReducer,
    customer: customerReducer,
    activeNameStore: activeWelcomNameSlice,
  },
});

export default store;
