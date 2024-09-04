import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Getpindetails } from "../../Action/Pins";
import PDstyle from "../Pindetails/Pin.module.css";

const Pindetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { pindetails, loading, error } = useSelector((state) => state.pins);

    useEffect(() => {
        dispatch(Getpindetails(id));
    }, [id, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Check if pindetails has data before rendering
    if (!pindetails) {
        return <div>No details available</div>;
    }

    return (
        <div className={PDstyle.container}>
            <div className={PDstyle.cart}>
                <div className={PDstyle.imageside}>
                    {pindetails.image ? (
                        <img src={pindetails.image} alt={pindetails.title} className={PDstyle.image} />
                    ) : (
                        <div>No image available</div>
                    )}
                </div>
                <div className={PDstyle.contant}>
                    <div className={PDstyle.head}>
                        {pindetails.user && pindetails.user.username ? (
                            <div>{pindetails.user.username}</div>
                        ) : (
                            <div>Anonymous</div>
                        )}
                    </div>
                    
                    <div>
                        <div>{pindetails.title}</div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pindetail;
