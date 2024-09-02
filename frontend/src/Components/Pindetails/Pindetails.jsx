import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Getpindetails } from "../../Action/Pins";
const Pindetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(Getpindetails(id))
    }, [])
    return (
        <div>
            Pindetails
        </div>
    );
}
export default Pindetails;