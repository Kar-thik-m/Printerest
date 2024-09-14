import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SaveDetailsPin } from "../../Action/Savepin.jsx";
import sdStyle from "../SavePinDetails/SavePinDetails.module.css";

const SavePinDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { savedetails, loading } = useSelector((state) => state.save);
 
    useEffect(() => {
        dispatch(SaveDetailsPin(id));
    }, [id, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!savedetails) {
        return <div>No details available</div>;
    }

    return (
        <div className={sdStyle.container}>
            <div className={sdStyle.cart}>
                <div className={sdStyle.imageside}>
                    <img
                        src={savedetails.items[0].image.url}
                        alt={savedetails.items[0].title}
                        className={sdStyle.image}
                    />
                </div>
                <div className={sdStyle.content}>
                    <div className={sdStyle.username}>
                        <div>{savedetails.user.username}</div>
                        <button className={sdStyle.follow}>Follow</button>
                    </div>
                    <div className={sdStyle.title}>
                        <div>{savedetails.items[0].title}</div>
                    </div>
                    <div className={sdStyle.comment}>
                        <div style={{ margin: "10px" }}>
                            <h3>Comments!</h3>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: "10vh", display: "flex", alignItems: "center" }}>
                        <div className={sdStyle.commentContainer}>
                            <input
                                id="comment"
                                className={sdStyle.commentTextarea}
                                placeholder="Write your comment here..."
                            />
                            <button className={sdStyle.commentButton}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavePinDetails;
