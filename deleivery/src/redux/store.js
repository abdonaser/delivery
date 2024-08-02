<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./reducers";
import cartReducer from "./reducers";
import authReducer from "./authSlice";
import customerReducer from "./customerReducer";

=======
import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './reducers';
import cartReducer from './reducers';
import authReducer from './authSlice';
import activeWelcomNameSlice from "./ActiveWelcomName";
>>>>>>> cf88f00de146e752ef899a2ae264efa412ad8798
const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    cart: cartReducer,
    auth: authReducer,
<<<<<<< HEAD
    customer: customerReducer,
=======
    activeNameStore: activeWelcomNameSlice,
>>>>>>> cf88f00de146e752ef899a2ae264efa412ad8798
  },
});

export default store;
