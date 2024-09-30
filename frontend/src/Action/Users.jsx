
import {
    loginRequest, loginFail, loginSuccess, registerFail, registerRequest, registerSuccess,
    loadUserRequest, loadUserFail, loadUserSuccess,
    followingFail, followingRequest, followingSuccess, unfollowFail, unfollowRequest, unfollowSuccess,
    getfollowsFail, getfollowsRequest, getfollowsSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess,
    alluserFail, alluserRequest, alluserSuccess
} from "../Slice/AuthSlice.js";

import { Url } from "../../Config.js";
export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    console.log(userData)

    try {
        const response = await fetch(`${Url}/user/register`, {
            method: 'POST',

            body: userData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(registerFail(errorData.message));
            return;
        }

        const data = await response.json();
        if (data && data.token) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(registerSuccess(data));

        } else {
            dispatch(registerFail("Unexpected response format."));
        }


    } catch (error) {
        dispatch(registerFail(error.toString()));
    }
};




export const LoginApi = (userData) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await fetch(`${Url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {

            const errorData = await response.text();
            dispatch(loginFail(errorData));
            return;
        }

        const data = await response.json();

        if (data && data.token) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(loginSuccess(data));
        } else {
            dispatch(loginFail("Unexpected response format."));
        }

    } catch (error) {
        dispatch(loginFail(error.message || "An unexpected error occurred."));
    }
};


export const Loaduser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());


        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        const response = await fetch(`${Url}/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load user');
        }

        const data = await response.json();
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error || 'Something went wrong'));
    }
};


export const Follow = (OthersId) => async (dispatch) => {
    try {
        dispatch(followingRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        console.log(JSON.stringify({ OthersId }))
        const response = await fetch(`${Url}/user/following`, {
            method: 'POST',
            headers: {

                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ OthersId }),
        });

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(errorText || 'Network response was not ok');
        }

        await response.json();
        dispatch(followingSuccess(OthersId));
    } catch (error) {
        console.error('Error:', error);
        dispatch(followingFail(error.toString()));
    }

}


export const UnFollow = (OthersId) => async (dispatch) => {
    try {

        dispatch(unfollowRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        console.log(OthersId)
        const response = await fetch(`${Url}/user/unfollow`, {
            method: 'POST',
            headers: {

                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ OthersId }),

        });
        console.log(JSON.stringify({ OthersId }));
        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(errorText || 'Network response was not ok');
        }

        await response.json();
        dispatch(unfollowSuccess(OthersId));
    } catch (error) {
        console.error('Error:', error);
        dispatch(unfollowFail(error.toString()));
    }
}



export const userFollwsdetails = async (dispatch) => {
    try {
        dispatch(getfollowsRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/user/profilefollows`);

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(errorText || 'Network response was not ok');
        }

        const data = await response.json();
        dispatch(getfollowsSuccess(data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getfollowsFail(error.toString()));
    }
}


export const updateProfile = (userData, userId) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }

        const formData = new FormData();
        if (userData.username) {
            formData.append('username', userData.username);
        }
        if (userData.file) {
            formData.append('file', userData.file);
        }

        const response = await fetch(`${Url}/user/updateprofile/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Network response was not ok');
        }

        const data = await response.json();
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        console.error('Error updating profile:', error);
        dispatch(updateProfileFail(error.toString()));
    }
};


export const getProfileunique = (id) => async (dispatch) => {
    try {
        dispatch(alluserRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/user/profile/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(alluserFail(error));
            return; 
        }

        const data = await response.json();
        dispatch(alluserSuccess(data));
    } catch (error) {
        dispatch(alluserFail(error.toString()));
    }
};
