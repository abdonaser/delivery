import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './reducers';
import cartReducer from './reducers';
import authReducer from './authSlice';
import activeWelcomNameSlice from "./ActiveWelcomName";
const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    cart: cartReducer,
    auth: authReducer,
    activeNameStore: activeWelcomNameSlice,
  },
});

export default store;

