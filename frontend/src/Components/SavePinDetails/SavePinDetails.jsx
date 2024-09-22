import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SaveDetailsPin, UnsavePin } from "../../Action/Savepin.jsx";
import { postcomments } from "../../Action/Pins.jsx";
import sdStyle from "../SavePinDetails/SavePinDetails.module.css";

const SavePinDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    
    const { savedetails, loading, error } = useSelector((state) => state.save);
    const { loaduser } = useSelector((state) => state.user);
    const item = savedetails?.items[0];

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

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (comment.trim() === "") return;
        await dispatch(postcomments(item._id, comment));
        setComment("");
        dispatch(SaveDetailsPin(id));
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        if (seconds < 5) return "Just now";
        if (seconds < 60) return `${seconds} seconds ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return `${Math.floor(seconds / 86400)} days ago`;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!savedetails || !item) return <div>No details available</div>;

    return (
        <div className={sdStyle.container}>
            <div className={sdStyle.cart}>
                <div className={sdStyle.imageside}>
                    <img src={item.image.url} alt={item.title} className={sdStyle.image} />
                </div>
                <div className={sdStyle.contantside}>
                    <div className={sdStyle.head}>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div className={sdStyle.save} onClick={unsave}>
                            <b>{isSaved ? 'Saved' : <Link to="/" style={{ textDecoration: "none", color: "white" }}>Save</Link>}</b>
                        </div>
                    </div>
                    <div className={sdStyle.username}>
                        <div>{savedetails.user.username}</div>
                        <button className={sdStyle.follow}>Follow</button>
                    </div>
                    <div className={sdStyle.title}>
                        <div>{item.title}</div>
                    </div>
                    <div className={sdStyle.comment}>
                        <div style={{ margin: "10px" }}>Comments!</div>
                        {item.comments && item.comments.length > 0 ? (
                            item.comments.map((c) => (
                                <div key={c._id} className={sdStyle.commentItem}>
                                    <div className={sdStyle.commentuser}>
                                        <div className={sdStyle.commentsImage}>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s" alt="User" />
                                        </div>
                                        <div className={sdStyle.userdetails}>
                                            <div>{c.name}</div>
                                            <div>{c.content}</div>
                                            <div>
                                                {loaduser._id === c.userId && <i className="fa fa-ban" aria-hidden="true"></i>}
                                                <b style={{ marginLeft: "1rem" }}>{formatTimeAgo(c.createdAt)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={sdStyle.emptyPage}>No comments yet!</div>
                        )}
                    </div>
                    <div style={{ width: "100%", height: "10vh", display: "flex", alignItems: "center" }}>
                        <div className={sdStyle.commentContainer}>
                            <input
                                id="comment"
                                className={sdStyle.commentTextarea}
                                placeholder="Write your comment here..."
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            <button className={sdStyle.commentButton} onClick={handleCommentSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavePinDetails;
