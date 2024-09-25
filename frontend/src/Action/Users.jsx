
import {
    loginRequest, loginFail, loginSuccess, registerFail, registerRequest, registerSuccess,
    loadUserRequest, loadUserFail, loadUserSuccess
} from "../Slice/AuthSlice.js";
import { Url } from "../../config.js";

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
            // Check if response has JSON data, otherwise handle non-JSON errors
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
        const token =  user.token ; 

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

