import { registerRequest, registerSuccess, registerFail } from "../Slice/AuthSlice.js"
import { Url } from "../../Config.js";
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
