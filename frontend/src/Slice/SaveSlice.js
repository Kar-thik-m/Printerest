import { createSlice } from "@reduxjs/toolkit";



const initialState = {

    loading: false,
    saveitems: null,
    savedetails: null,
    error: null,

};


const SaveSlice = createSlice({
    name: "save",
    initialState,
    reducers: {
        SaveRequest(state) {
            state.loading = true;
            state.error = null;
           
        },
        SaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload;
          
        },
        SaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
           
        },
        GetSaveRequest(state) {
            state.loading = true;
            state.error = null;
        },
        GetSaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload;
        },
        GetSaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        SaveDetailsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        SaveDetailsSuccess(state, action) {
            state.loading = false;
            state.savedetails = action.payload;
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
            state.saveitems = state.saveitems.filter(item => item.id !== action.payload.id );
            
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