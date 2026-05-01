import { createSlice } from "@reduxjs/toolkit";



const initialState = {

    loading: false,
    saveitems: null,
    savedetails: null,
    error: null,
    message: null
};


const SaveSlice = createSlice({
    name: "save",
    initialState,
    reducers: {
        SaveRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        SaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload.save || action.payload;
            state.message = action.payload.message || null;
        },
        SaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
           
        },
        GetSaveRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        GetSaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload.saves || action.payload.save || action.payload;
            state.message = action.payload.message || null;
        },
        GetSaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        SaveDetailsRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        SaveDetailsSuccess(state, action) {
            state.loading = false;
            state.savedetails = action.payload.save || action.payload;
            state.message = action.payload.message || null;
        },
        SaveDetailsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        DeleteSaveRequest(state) {
            state.loading = true;
            state.error = null;
            
        },
        DeleteSaveSuccess(state, action) {
            state.loading = false;
           
            
        },
        DeleteSaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
          
        },
    }
})

export const { SaveDetailsFailure, SaveDetailsRequest,
    SaveDetailsSuccess, SaveFailure, SaveRequest, SaveSuccess, GetSaveFailure,
    GetSaveRequest, GetSaveSuccess,DeleteSaveFailure,DeleteSaveRequest,DeleteSaveSuccess} = SaveSlice.actions;
export default SaveSlice.reducer;