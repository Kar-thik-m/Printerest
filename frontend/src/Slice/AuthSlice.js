import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
      loaduser:null,
        error: null
    },
    reducers: {
        loginRequest(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authuser = action.payload;
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        registerRequest(state) {
            state.loading = true;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        registerFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loadUserRequest(state) {
            state.isAuthenticated = false;
            state.loading = true;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loadUserFail(state) {
            state.loading = false;
            
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFail(state, action) {
            state.error = action.payload;
        },
        loadUserRequest(state) {
            state.loading = true;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.loaduser = action.payload; 
        },
        loadUserFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
       
    }
});

const { actions, reducer } = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
   
} = actions;

export default reducer;
