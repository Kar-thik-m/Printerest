import { pinRequest, pinSuccess, pinFailure } from "../Slice/PinSlice";
import { Url } from "../../Config";

export const GetPinsAll = () => async (dispatch) => {
    try {
        dispatch(pinRequest());
        const response = await fetch(`${Url}/item/getallpins`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(pinSuccess(data));
    } catch (error) {
        dispatch(pinFailure(error));
    }
};
