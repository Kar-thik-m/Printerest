import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
        loaduser: null,
        error: null,
        following: null,
        followfllowing: null,
        uservariant: null,
        message: null
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
            state.loading = true;
            state.message = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.loaduser = action.payload.user || action.payload;
            state.message = action.payload.message || null;
        },
        loadUserFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFail(state, action) {
            state.error = action.payload;
        },
        followingRequest(state) {
            state.loading = true;
            state.message = null;
        },
        followingSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.following = action.payload.following || action.payload;
            state.message = action.payload.message || null;
        },
        followingFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        unfollowRequest(state) {
            state.loading = true;
            state.message = null;
        },
        unfollowSuccess(state, action) {
            state.loading = false;
            state.following = action.payload.following || action.payload;
            state.message = action.payload.message || null;
        },
        unfollowFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getfollowsRequest(state) {
            state.loading = true;
            state.message = null;
        },
        getfollowsSuccess(state, action) {
            state.loading = false;
            state.followfllowing = action.payload.follows || action.payload;
            state.message = action.payload.message || null;
        },
        getfollowsFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.uservariant = { ...state.uservariant, ...(action.payload.user || action.payload) }; 
            state.message = action.payload.message || null;
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        alluserRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        alluserSuccess(state, action) {
            state.loading = false;
            state.uservariant = action.payload.profile || action.payload;
            state.message = action.payload.message || null;
        },
        alluserFail(state, action) {
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
    followingFail,
    followingRequest,
    followingSuccess,
    unfollowFail,
    unfollowRequest,
    unfollowSuccess,
    getfollowsFail, 
    getfollowsRequest,
    getfollowsSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    alluserFail,
    alluserRequest,
    alluserSuccess
} = actions;

export default reducer;
