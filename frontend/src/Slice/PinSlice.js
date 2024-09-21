import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
  loading: false,
  error: null,
  item:null,
  pindetails:null,
  Comments:null
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
      state.item=action.payload
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
    RequestComment(state){
      state.loading = true;
      state.error = null;
    },
    SuccessComment(state,action){
      state.loading = false;
      state.Comments = action.payload;
    },
  FailureComment(state,action){
    state.loading = false;
    state.error = action.payload;
    },
  },
});

export const { pinRequest, pinSuccess, pinFailure, CreatepinRequest, CreatepinSuccess, CreatepinFailure,
  pinDetailsFailure, pinDetailsRequest, pinDetailsSuccess,RequestComment,SuccessComment,FailureComment
} = pinSlice.actions;

export default pinSlice.reducer;
