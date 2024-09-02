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
            dispatch(pinFailure(error));
        }
        const data = await response.json();
        dispatch(pinSuccess(data));
    } catch (error) {
        dispatch(pinFailure(error));
    }
};


export const Getpindetails = (id) => async (dispatch) => {
    try {
        dispatch(pinDetailsRequest())
        const response = await fetch(`${Url}/item/${id}`);
        const data = await response.json();
        dispatch(pinDetailsSuccess(data));
    } catch (error) {
        dispatch(pinDetailsFailure(error));
    }
}



export const createPin = (pinData) => async (dispatch) => {
    try {
        dispatch(CreatepinRequest());

        const response = await fetch(`${Url}/item/pins`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(pinData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        dispatch(CreatepinSuccess(data));
    } catch (error) {
        dispatch(CreatepinFailure(error.toString()));
    }
};
