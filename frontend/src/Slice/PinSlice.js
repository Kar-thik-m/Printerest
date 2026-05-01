import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults:null,
  loading: null,
  error: null,
  item: null,
  pindetails: null,
  Comments: null,
  message: null
};

const pinSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    pinRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    pinSuccess(state, action) {
      state.loading = false;
      state.item = action.payload.pins || action.payload;
      state.message = action.payload.message || null;
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
      state.message = null;
    },
    CreatepinSuccess(state, action) {
      state.loading = false;
      state.item = action.payload.pin || action.payload;
      state.message = action.payload.message || null;
    },
    pinDetailsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    pinDetailsSuccess(state, action) {
      state.loading = false;
      state.pindetails = action.payload.pin || action.payload;
      state.message = action.payload.message || null;
    },
    pinDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    RequestComment(state) {
      state.loading = true;
      state.error = null;
    },
    SuccessComment(state, action) {
      state.loading = false;
      state.Comments = action.payload;
    },
    FailureComment(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCommentRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess(state, action) {
      state.loading = false;

      state.Comments = Comments.filter(item => item.id !== action.payload.id);
    },
    deleteCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePinRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deletePinSuccess(state, action) {
      state.loading = false;

    },
    deletePinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    DownloadPinRequest(state) {
      state.loading = true;
      state.error = null;
    },
    DownloadPinSuccess(state, action) {
      state.loading = false;

    },
    DownloadinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    searchRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
  },
  searchSuccess(state, action) {
      state.loading = false;
      state.searchResults = action.payload.pins || action.payload;
      state.message = action.payload.message || null;
  },
  searchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
  },
  },
});

export const { pinRequest, pinSuccess, pinFailure, CreatepinRequest, CreatepinSuccess, CreatepinFailure,
  pinDetailsFailure, pinDetailsRequest, pinDetailsSuccess, RequestComment, SuccessComment, FailureComment,
  deleteCommentFailure, deleteCommentRequest, deleteCommentSuccess, deletePinFailure, deletePinRequest, deletePinSuccess,
  DownloadPinRequest,DownloadPinSuccess,DownloadinFailure,searchFail,searchRequest,searchSuccess
} = pinSlice.actions;

export default pinSlice.reducer;
