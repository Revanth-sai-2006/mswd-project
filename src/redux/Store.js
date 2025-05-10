// src/redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Corrected import path

const Store = configureStore({
  reducer: {
    auth: authReducer, // your auth slice reducer is here
  },
});

export default Store;
