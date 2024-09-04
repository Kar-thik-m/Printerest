import axios from "axios";
import {
    loginRequest, loginFail, loginSuccess, registerFail, registerRequest, registerSuccess,
    loadUserRequest, loadUserFail, loadUserSuccess
} from "../Slice/AuthSlice.js";
import { Url } from "../../config.js";

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await fetch(`${Url}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(registerFail(errorData.message));
            return;
        }

        const data = await response.json();
        dispatch(registerSuccess(data));

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
            await response.json();

            return;
        }

        const data = await response.json();
        
        dispatch(loginSuccess(data));

    } catch (error) {
        dispatch(loginFail(error));
    }
};


export const Loaduser = async (dispatch) => {
    try {
        dispatch(loadUserRequest());
     
        const { data } = await axios.get(`${Url}/user/profile`, {
            withCredentials: true,
        });

        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response?.data?.message || error.message || 'Something went wrong'));
    }
};

