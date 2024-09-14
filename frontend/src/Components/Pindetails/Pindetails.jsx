import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Getpindetails } from "../../Action/Pins";
import PDstyle from "../Pindetails/Pin.module.css";
import { PostSave } from "../../Action/Savepin";
const Pindetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [save, SavePindata] = useState(false);
    const { pindetails, loading, error } = useSelector((state) => state.pins);

    useEffect(() => {
        dispatch(Getpindetails(id));

    }, [id, dispatch]);

    const Savepin = () => {
        SavePindata((save)=>save ? false : true);
        if (!save) {
            dispatch(PostSave(id));
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!pindetails) {
        return <div>No details available</div>;
    }

    // Main render
    return (
        <div className={PDstyle.container}>
            <div className={PDstyle.cart}>
                <div className={PDstyle.imageside}>
                    <img src={pindetails.image.url} alt={pindetails.title} className={PDstyle.image} />
                </div>
                <div className={PDstyle.contant}>
                    <div className={PDstyle.head}>
                        <i className={`fa ${save ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div className={PDstyle.save} onClick={Savepin}>
                            {save ? <b>Saved</b> : <b>Save</b>}
                        </div>
                    </div>
                    <div className={PDstyle.username}>
                        <div>{pindetails.user.username}</div>
                        <button className={PDstyle.follow}>Follow</button>
                    </div>
                    <div className={PDstyle.title}>
                        <div>{pindetails.title}</div>
                    </div>
                    <div className={PDstyle.comment}>
                        <div style={{ margin: "10px" }}>Comments!</div>
                    </div>
                    <div style={{ width: "100%", height: "10vh", display: "flex", alignItems: "center" }}>
                        <div className={PDstyle.commentContainer}>
                            <input id="comment" className={PDstyle.commentTextarea} placeholder="Write your comment here..." />
                            <button className={PDstyle.commentButton}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pindetail;
