import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading: false,
    saveitems: null,
    savedetails: null,
    error: null,
    message: null,
    status: null,
    showNotification: false,
    timer: null
};

const SaveSlice = createSlice({
    name: "save",
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

        SaveRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        SaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload.save || action.payload;
            state.message = action.payload.message || "Pin saved successfully";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        SaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to save pin";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        GetSaveRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        GetSaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload.saves || action.payload.save || action.payload;
            // state.message = action.payload.message || null;
        },
        GetSaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to fetch saved pins";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        SaveDetailsRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        SaveDetailsSuccess(state, action) {
            state.loading = false;
            state.savedetails = action.payload.save || action.payload;
            // state.message = action.payload.message || null;
        },
        SaveDetailsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to fetch save details";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        DeleteSaveRequest(state) {
            state.loading = true;
            state.error = null;
        },
        DeleteSaveSuccess(state, action) {
            state.loading = false;
            state.message = "Save removed successfully";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        DeleteSaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to remove save";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        clearMessage(state) {
            state.message = null;
        },
        clearError(state) {
            state.error = null;
        },
    }
})

export const { setNotification, clearNotification, SaveDetailsFailure, SaveDetailsRequest,
    SaveDetailsSuccess, SaveFailure, SaveRequest, SaveSuccess, GetSaveFailure,
    GetSaveRequest, GetSaveSuccess,DeleteSaveFailure,DeleteSaveRequest,DeleteSaveSuccess, clearMessage, clearError} = SaveSlice.actions;
export default SaveSlice.reducer;