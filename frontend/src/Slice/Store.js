import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/AuthSlice';
import pinReducer from './PinSlice';

const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    pins: pinReducer,  
  },
});

export default store;
