import {
    pinRequest, pinFailure, pinSuccess, CreatepinRequest, CreatepinFailure, CreatepinSuccess,
    pinDetailsFailure, pinDetailsRequest, pinDetailsSuccess, RequestComment, SuccessComment, FailureComment,
    deleteCommentFailure,deleteCommentRequest,deleteCommentSuccess,deletePinFailure,deletePinRequest,deletePinSuccess
} from "../Slice/PinSlice";

import { Url } from "../../Config";



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


export const createPin = (formData) => async (dispatch) => {
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
            body: formData,
        });

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(errorText || 'Network response was not ok');
        }

        const data = await response.json();
        dispatch(CreatepinSuccess(data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(CreatepinFailure(error.toString()));
    }
};
export const postcomments = (id, content) => async (dispatch) => {
    try {
        dispatch(RequestComment());
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await fetch(`${Url}/item/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, id }),
        });
        if (!response.ok) {
            const error = await response.text();
            dispatch(FailureComment(error));
            return; 
        }
        await response.json();
        dispatch(SuccessComment(content));
    } catch (error) {
        console.error('Error posting comment:', error);
        dispatch(FailureComment(error.toString()));
    }
};


export const DeletComment = (pinId, commentId ) => async (dispatch) => {
    try {
        dispatch(deleteCommentRequest());
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }
        const token = user.token;
        const response = await fetch(`${Url}/item/deletecomment`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ pinId, commentId })
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(deleteCommentFailure(error));
            return;
        }

        
        dispatch(deleteCommentSuccess(commentId));
    } catch (error) {
        dispatch(deleteCommentFailure(error));
    }
}

export const Deletepin=(id)=>async(dispatch)=>{
    try {
        
        dispatch(deletePinRequest());
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }
        const token = user.token;
        const response = await fetch(`${Url}/item/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id})
        });

        if (!response.ok) {
            const error = await response.text();
            dispatch(deletePinFailure(error));
            return;
        }

        
        dispatch(deletePinSuccess(id));
    } catch (error) {
        dispatch(deletePinFailure(error));
    }
}