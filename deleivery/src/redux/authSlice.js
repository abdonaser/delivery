// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    role: role || null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    clearAuth: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAuth, clearAuth, logout } = authSlice.actions;
export default authSlice.reducer;
