import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  items: [], 
  error: null,
};

const pinSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    pinRequest(state) {
      state.loading = true;
      state.error = null;
    },
    pinSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    pinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { pinRequest, pinSuccess, pinFailure } = pinSlice.actions;

export default pinSlice.reducer;
