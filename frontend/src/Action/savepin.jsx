import { Url } from "../../config";
import {
    GetSaveRequest, GetSaveSuccess, GetSaveFailure,
    SaveRequest, SaveSuccess, SaveFailure,
    SaveDetailsFailure, SaveDetailsSuccess, SaveDetailsRequest
} from "../Slice/SaveSlice";

export const CreateSave = () => async (dispatch) => {
    try {
        dispatch(GetSaveRequest());

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const response = await fetch(`${Url}/saveitem/save/all`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            const error = await response.text();
            dispatch(GetSaveFailure(error));
            return;
        }
        const data = await response.json();

        dispatch(GetSaveSuccess(data));
    } catch (error) {
        dispatch(GetSaveFailure(error.message));
    }
}


export const PostSave = (id) => async (dispatch) => {
    try {
        dispatch(SaveRequest());

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        const response = await fetch(`${Url}/saveitem/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items: id })
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(SaveFailure(error));
            return;
        }

        const data = await response.json();
        dispatch(SaveSuccess(data));
    } catch (error) {
        dispatch(SaveFailure(error.message));
    }
};

export const SaveDetailsPin = (id) => async (dispatch) => {
    try {
        dispatch(SaveDetailsRequest());
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }
        const token = user.token;

        const response = await fetch(`${Url}/saveitem/save/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(SaveDetailsFailure(error));
            return;
        }

        const data = await response.json();
       
        dispatch(SaveDetailsSuccess(data));

    } catch (error) {
        dispatch(SaveDetailsFailure(error.message || 'An unexpected error occurred'));
    }
};
