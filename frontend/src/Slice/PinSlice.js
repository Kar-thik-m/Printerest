import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: null,
  loading: null,
  error: null,
  item: null,
  pindetails: null,
  Comments: null,
  message: null,
  status: null,
  showNotification: false,
  timer: null
};

const pinSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.showNotification = true;
      state.timer = action.payload.timer || 3000;
    },

    clearNotification: (state) => {
      state.message = null;
      state.status = null;
      state.showNotification = false;
      state.timer = null;
    },

    pinRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    pinSuccess(state, action) {
      state.loading = false;
      state.item = action.payload.pins || action.payload;
      // state.message = action.payload.message || null;
    },
    pinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = action.payload || "Failed to fetch pins";
      state.status = "error";
      state.showNotification = true;
      state.timer = 3000;
    },
    CreatepinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = action.payload || "Failed to create pin";
      state.status = "error";
      state.showNotification = true;
      state.timer = 3000;
    },
    CreatepinRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    CreatepinSuccess(state, action) {
      state.loading = false;
      state.item = action.payload.pin || action.payload;
      state.message = "Pin created successfully";
      state.status = "success";
      state.showNotification = true;
      state.timer = 3000;
    },
    pinDetailsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    pinDetailsSuccess(state, action) {
      state.loading = false;
      state.pindetails = action.payload.pin || action.payload;
      // state.message = action.payload.message || null;
    },
    pinDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = "Failed to fetch pin details";
      state.status = "error";
      state.showNotification = true;
      state.timer = 3000;
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
      state.message = "Comment deleted successfully";
      state.status = "success";
      state.showNotification = true;
      state.timer = 3000;
      // state.Comments = Comments.filter(item => item.id !== action.payload.id);
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
      state.message = "Pin deleted successfully";
      state.status = "success";
      state.showNotification = true;
      state.timer = 3000;

    },
    deletePinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = "Failed to delete pin";
      state.status = "error";
      state.showNotification = true;
      state.timer = 3000;

    },
    DownloadPinRequest(state) {
      state.loading = true;
      state.error = null;
    },
    DownloadPinSuccess(state, action) {
      state.loading = false;
      state.message = "Pin downloaded successfully";
      state.status = "success";
      state.showNotification = true;
      state.timer = 3000;
    },
    DownloadinFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = "Failed to download pin";
      state.status = "error";
      state.showNotification = true;
      state.timer = 3000;
    },
    searchRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    searchSuccess(state, action) {
      state.loading = false;
      state.searchResults = action.payload.pins || action.payload;
      // state.message = action.payload.message || null;
    },
    searchFail(state, action) {
      state.loading = false;
      state.error = action.payload;

    },
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setNotification, clearNotification, pinRequest, pinSuccess, pinFailure, CreatepinRequest, CreatepinSuccess, CreatepinFailure,
  pinDetailsFailure, pinDetailsRequest, pinDetailsSuccess, RequestComment, SuccessComment, FailureComment,
  deleteCommentFailure, deleteCommentRequest, deleteCommentSuccess, deletePinFailure, deletePinRequest, deletePinSuccess,
  DownloadPinRequest, DownloadPinSuccess, DownloadinFailure, searchFail, searchRequest, searchSuccess, clearMessage, clearError
} = pinSlice.actions;

export default pinSlice.reducer;
