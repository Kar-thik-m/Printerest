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
        uservariant: null 
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
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.loaduser = action.payload; // Fixed to loaduser
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
        },
        followingSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.following = action.payload;
        },
        followingFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        unfollowRequest(state) {
            state.loading = true;
        },
        unfollowSuccess(state, action) {
            state.loading = false;
        },
        unfollowFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getfollowsRequest(state) {
            state.loading = true;
        },
        getfollowsSuccess(state, action) {
            state.loading = false;
            state.followfllowing = action.payload;
        },
        getfollowsFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.uservariant = { ...state.uservariant, ...action.payload }; 
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        alluserRequest(state) {
            state.loading = true;
            state.error = null;
        },
        alluserSuccess(state, action) {
            state.loading = false;
            state.uservariant = action.payload; // Fixed spelling here
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
