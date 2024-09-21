import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SaveDetailsPin } from "../../Action/Savepin.jsx";
import sdStyle from "../SavePinDetails/SavePinDetails.module.css";

const SavePinDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { savedetails, loading, error } = useSelector((state) => state.save);

    useEffect(() => {
        dispatch(SaveDetailsPin(id));
    }, [id, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!savedetails) {
        return <div>No details available</div>;
    }

    const { user, items } = savedetails;
    const item = items[0];
    console.log(item)

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
                        <i className={`fa ${item.saved ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div className={sdStyle.save}>
                            <b>Save</b>
                        </div>
                    </div>
                    <div className={sdStyle.username}>
                        <div>{user.username}</div>
                        <button className={sdStyle.follow}>Follow</button>
                    </div>
                    <div className={sdStyle.title}>
                        <div>{item.title}</div>
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
