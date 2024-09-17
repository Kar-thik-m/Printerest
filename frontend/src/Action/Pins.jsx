import {
    pinRequest, pinFailure, pinSuccess, CreatepinRequest, CreatepinFailure, CreatepinSuccess,
    pinDetailsFailure, pinDetailsRequest, pinDetailsSuccess
} from "../Slice/PinSlice";

import { Url } from "../../config";


export const GetPinsAll = () => async (dispatch) => {
    try {
        dispatch(pinRequest());
        const response = await fetch(`${Url}/item/getallpins`);
        if (!response.ok) {
            const error = await response.text();
            dispatch(pinFailure(error));
        }
        const data = await response.json();
        dispatch(pinSuccess(data));
    } catch (error) {
        dispatch(pinFailure(error.toString()));
    }
};

export const Getpindetails = (id) => async (dispatch) => {
    try {
        dispatch(pinDetailsRequest());
        const response = await fetch(`${Url}/item/${id}`);
        if (!response.ok) {
            const error = await response.text();
            dispatch(pinDetailsFailure(error));
        }
        const data = await response.json();
        dispatch(pinDetailsSuccess(data));
    } catch (error) {
        dispatch(pinDetailsFailure(error.toString()));
    }
};


export const createPin = (pinData) => async (dispatch) => {
    try {
        dispatch(CreatepinRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/item/pins`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(pinData),
        });
console.log(JSON.stringify(pinData))
        if (!response.ok) {
            
            const errorText = await response.text();
            console.error('Response Status:', response.status);
            console.error('Response Text:', errorText);
            throw new Error(errorText || 'Network response was not ok');
        }

        const data = await response.json();
        dispatch(CreatepinSuccess(data));
    } catch (error) {
        console.error('Error:', error); 
        dispatch(CreatepinFailure(error.toString()));
    }
};