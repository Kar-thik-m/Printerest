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

        //Notification State
        message: null,
        status: null,
        showNotification: false,
        timer: null,


    },



    reducers: {


        setNotification: (state, action) => {
            state.message = action.payload.message;
            state.status = action.payload.status;
            state.showNotification = true;
            state.timer = 3000;
        },

        clearNotification: (state) => {
            state.message = null;
            state.status = null;
            state.showNotification = false;
            state.timer = null;
        },

        loginRequest(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.authuser = action.payload;

            // Set notification state directly
            state.message = action.payload.message || "Login Success";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload;

            // Set notification state directly

            state.message = action.payload.message || "Login Failed";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        clearError(state) {
            state.error = null;
        },
        clearMessage(state) {
            state.message = null;
        },
        registerRequest(state) {
            state.loading = true;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;

            // Set notification state directly
            state.message = action.payload.message || "Registration Success";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        registerFail(state, action) {
            state.loading = false;
            state.error = action.payload;

            // Set notification state directly
            state.message = action.payload.message || "Registration Failed";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        loadUserRequest(state) {
            state.loading = true;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.loaduser = action.payload.user || action.payload;
            // Silent success - do not touch message/status/showNotification
        },
        loadUserFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = "Logged out successfully";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        logoutFail(state, action) {
            state.error = action.payload;
            state.message = action.payload || "Logout failed";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        followingRequest(state) {
            state.loading = true;
        },
        followingSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.following = action.payload.following || action.payload;
            state.message = action.payload.message || null;

            // Set notification state directly
            state.message = action.payload.message || "Following Success";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        followingFail(state, action) {
            state.loading = false;
            state.error = action.payload;

            // Set notification state directly
            state.message = action.payload.message || "Following Failed";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        unfollowRequest(state) {
            state.loading = true;
        },
        unfollowSuccess(state, action) {
            state.loading = false;
            state.following = action.payload.following || action.payload;
            state.message = action.payload.message || null;

            // Set notification state directly
            state.message = action.payload.message || "Unfollow Success";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        unfollowFail(state, action) {
            state.loading = false;
            state.error = action.payload;

            // Set notification state directly
            state.message = action.payload.message || "Unfollow Failed";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        getfollowsRequest(state) {
            state.loading = true;
        },
        getfollowsSuccess(state, action) {
            state.loading = false;
            state.followfllowing = action.payload.follows || action.payload;
            // Not showing notification for just fetching follows usually, but keeping state clean
            state.message = null;
            state.showNotification = false;
        },
        getfollowsFail(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to fetch follows";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.uservariant = { ...state.uservariant, ...(action.payload.user || action.payload) };
            state.message = action.payload.message || "Profile updated successfully";
            state.status = "success";
            state.showNotification = true;
            state.timer = 3000;
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to update profile";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },
        alluserRequest(state) {
            state.loading = true;
        },
        alluserSuccess(state, action) {
            state.loading = false;
            state.uservariant = action.payload.profile || action.payload;
            // Silent success - do not touch message/status/showNotification
        },
        alluserFail(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload || "Failed to fetch user profile";
            state.status = "error";
            state.showNotification = true;
            state.timer = 3000;
        },

    }
});

const { actions, reducer } = authSlice;

export const {
    setNotification,
    clearNotification,
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    clearMessage,
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
