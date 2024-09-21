import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SaveDetailsPin, UnsavePin } from "../../Action/Savepin.jsx";
import sdStyle from "../SavePinDetails/SavePinDetails.module.css";

const SavePinDetails = () => {
    const { id } = useParams();
  
    const dispatch = useDispatch();
    const { savedetails, loading, error } = useSelector((state) => state.save);
    const [isSaved, setIsSaved] = useState(false); 

    useEffect(() => {
        dispatch(SaveDetailsPin(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (savedetails) {
            setIsSaved(true); 
        }
    }, [savedetails]);

    const unsave = useCallback(() => {
        dispatch(UnsavePin(id));
        setIsSaved(false); 
    }, [dispatch, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        alert(error);
        return <div>Error occurred</div>; 
    }

    if (!savedetails) {
        return <div>No details available</div>;
    }

    const { user, items } = savedetails;
    const item = items[0];

    return (
        <div className={sdStyle.container}>
            <div className={sdStyle.cart}>
                <div className={sdStyle.imageside}>
                    <img
                        src={item.image.url}
                        alt={item.title}
                        className={sdStyle.image}
                    />
                </div>
                <div className={sdStyle.contantside}>
                    <div className={sdStyle.head}>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div className={sdStyle.save} onClick={unsave}>
                            <b>{isSaved ? 'Saved' : <Link style={{textDecoration:"none",color:"white"}} to={"/"} >Save</Link> }</b> 
                        </div>
                    </div>
                    <div className={sdStyle.username}>
                        <div>{user.username}</div>
                        <button className={sdStyle.follow}>Follow</button>
                    </div>
                    <div className={sdStyle.title}>
                        <div>{item.title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavePinDetails;
