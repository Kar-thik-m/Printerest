
import {
    GetSaveRequest, GetSaveSuccess, GetSaveFailure,
    SaveRequest, SaveSuccess, SaveFailure,
    SaveDetailsFailure, SaveDetailsSuccess, SaveDetailsRequest,
    DeleteSaveFailure, DeleteSaveRequest, DeleteSaveSuccess
} from "../Slice/SaveSlice";
import { Url } from "../../Config";
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


export const PostSave = (items, createrUserId) => async (dispatch) => {
    try {
        dispatch(SaveRequest());
        if (!items) {
            console.log("items notfound")
        }
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        const response = await fetch(`${Url}/saveitem/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items })
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



export const UnsavePin = (id) => async (dispatch) => {
    try {
        dispatch(DeleteSaveRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }
        const token = user.token;
        const response = await fetch(`${Url}/saveitem/unsave/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(DeleteSaveFailure(error));
            return;
        }


        dispatch(DeleteSaveSuccess(id));
    } catch (error) {
        dispatch(DeleteSaveFailure(error.message));
    }
};

