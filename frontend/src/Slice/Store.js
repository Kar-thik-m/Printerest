import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/AuthSlice';
import pinReducer from './PinSlice';
import SaveReducer from './SaveSlice';
const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    pins: pinReducer,
    save: SaveReducer
  },
});

export default store;
