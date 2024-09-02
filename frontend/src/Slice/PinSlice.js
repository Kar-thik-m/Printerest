import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
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
      state.item = action.payload;
    },
    pinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    CreatepinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    CreatepinRequest(state) {
      state.loading = true;
      state.error = null;
    },
    CreatepinSuccess(state, action) {
      state.loading = false;
      state.items.push(action.payload);
    },
    pinDetailsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    pinDetailsSuccess(state, action) {
      state.loading = false;
      state.pindetails = action.payload;
    },
    pinDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { pinRequest, pinSuccess, pinFailure, CreatepinRequest, CreatepinSuccess, CreatepinFailure,
  pinDetailsFailure, pinDetailsRequest, pinDetailsSuccess
} = pinSlice.actions;

export default pinSlice.reducer;
