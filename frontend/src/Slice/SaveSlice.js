import { createSlice } from "@reduxjs/toolkit";



const initialState = {

    loading: false,
    saveitems: null,
    savedetails: null,
    itemsave:false,
    error: null,

};


const SaveSlice = createSlice({
    name: "save",
    initialState,
    reducers: {
        SaveRequest(state) {
            state.loading = true;
            state.error = null;
            state.itemsave=false
        },
        SaveSuccess(state, action) {
            state.loading = false;
            state.saveitems = action.payload;
            state.itemsave=true;
        },
        SaveFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.itemsave=false
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
    }
})

export const { SaveDetailsFailure, SaveDetailsRequest,
    SaveDetailsSuccess, SaveFailure, SaveRequest, SaveSuccess, GetSaveFailure,
    GetSaveRequest, GetSaveSuccess } = SaveSlice.actions;
export default SaveSlice.reducer;