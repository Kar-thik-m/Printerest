import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Getpindetails } from "../../Action/Pins";
import PDstyle from "../Pindetails/Pin.module.css";
import { PostSave } from "../../Action/Savepin";
import { CreateSave } from "../../Action/Savepin";


const Pindetail = () => {
    const [isSaved, setIsSaved] = useState(false);


    const { id } = useParams();
    const dispatch = useDispatch();

    const { pindetails, loading, error } = useSelector((state) => state.pins);
    const { saveitems } = useSelector((state) => state.save);

    useEffect(() => {
        dispatch(Getpindetails(id));
        dispatch(CreateSave());
    }, [id, dispatch]);

    useEffect(() => {
        if (Array.isArray(saveitems)) {
            saveitems.map((item) => {
                Array.isArray(item.items) && item.items.map((savedpin => {
                    if (savedpin._id === id) {
                        setIsSaved(true);
                    }
                }))

            }
            );
        }

    }, [saveitems, id]);


    const handleSave = () => {
        if (!isSaved) {
            dispatch(PostSave(id));
            setIsSaved(true);
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

    return (
        <div className={PDstyle.container}>
            <div className={PDstyle.cart}>
                <div className={PDstyle.imageside}>
                    <img src={pindetails.image.url} alt={pindetails.title} className={PDstyle.image} />
                </div>
                <div className={PDstyle.contant}>
                    <div className={PDstyle.head}>
                        <i className={'fa-heart-o'} aria-hidden="true"></i>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div className={PDstyle.save} onClick={handleSave}>
                            <b>{isSaved ? <Link style={{textDecoration:"none",color:"white"}} to={"/profile"} >Saved</Link> : "Save"}</b>
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
