import { pinRequest,pinFailure,pinSuccess,CreatepinRequest,CreatepinFailure,CreatepinSuccess } from "../Slice/PinSlice";
import { Url } from "../../config";

export const GetPinsAll = () => async (dispatch) => {
    try {
        dispatch(pinRequest());
        const response = await fetch(`${Url}/item/getallpins`); // Correct URL
        if (!response.ok) {
            dispatch(pinFailure(error)); 
        }
        const data = await response.json();
        dispatch(pinSuccess(data)); // Pasthe actual data to pinSuccess
    } catch (error) {
        dispatch(pinFailure(error)); // Convert error to string
    }
};




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
