import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Getpindetails, postcomments, DeletComment,Deletepin } from "../../Action/Pins.jsx";
import { PostSave } from "../../Action/Savepin.jsx";
import PDstyle from "../Pindetails/Pin.module.css";

const Pindetail = () => {
    const [isSaved, setIsSaved] = useState(false);
    const { loaduser } = useSelector((state) => state.user);
    const navigate=useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const { pindetails, loading, error } = useSelector((state) => state.pins);
    const { saveitems } = useSelector((state) => state.save);

    useEffect(() => {
        dispatch(Getpindetails(id));
        dispatch(PostSave());
    }, [id, dispatch]);

    useEffect(() => {
        if (Array.isArray(saveitems)) {
            const isPinSaved = saveitems.some(item =>
                Array.isArray(item.items) && item.items.some(savedpin => savedpin._id === id)
            );
            setIsSaved(isPinSaved);
        }
    }, [saveitems, id]);
console.log(id)
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

    const handleSave = async() => {
        if (!isSaved) {
            if (items.length === 0) {
                alert('Please select at least one item to save.');
                return;
            }
            
            await dispatch(PostSave(id));
            await setIsSaved(true);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            if (comment.trim() === "") return;
        await dispatch(postcomments(id, comment));
        await dispatch(Getpindetails(id));
        setComment("");
        } catch (error) {
           alert(error)
        }
    };

    const deleteComment = async (commentId) => {
      try {
        await dispatch(DeletComment(id, commentId));
        await dispatch(Getpindetails(id));
      } catch (error) {
        alert(error);
      }
    };

    const DeletePin=async()=>{
        try {
           await dispatch(Deletepin(id))
           await navigate('/')
           
        } catch (error) {
            console.log(error)
        }
    }
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
                        <i className='fa-heart-o' aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true" onClick={DeletePin}></i>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div className={PDstyle.save} onClick={handleSave}>
                            <b>
                                {isSaved ? (
                                    <Link style={{ textDecoration: "none", color: "white" }} to="/profile">Saved</Link>
                                ) : (
                                    "Save"
                                )}
                            </b>
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
                        {pindetails.comments.length > 0 ? (
                            pindetails.comments.map((c) => (
                                <div key={c._id} className={PDstyle.commentItem}>
                                    <div className={PDstyle.commentuser}>
                                        <div className={PDstyle.commmentimage}>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCW8ayM9K_iNzX81NSjgpGcl30jDvsTSiIg&s" alt="User" />
                                        </div>
                                        <div className={PDstyle.userdetails}>
                                            <div>{c.name}</div>
                                            <div>{c.content}</div>
                                            <div>
                                                {loaduser._id === c.userId && (
                                                    <i
                                                        style={{ cursor: "pointer", color: "red" }}
                                                        className="fa fa-ban"
                                                        aria-hidden="true"
                                                        onClick={() => deleteComment(c._id)} 
                                                    ></i>
                                                )}
                                                <b style={{ marginLeft: "1rem" }}>{formatTimeAgo(c.createdAt)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={PDstyle.emtypage}>No comments yet!</div>
                        )}
                    </div>
                    <div style={{ width: "100%", height: "10vh", display: "flex", alignItems: "center" }}>
                        <div className={PDstyle.commentContainer}>
                            <input
                                id="comment"
                                className={PDstyle.commentTextarea}
                                placeholder="Write your comment here..."
                                onChange={handleCommentChange}
                                value={comment} 
                            />
                            <button className={PDstyle.commentButton} onClick={handleCommentSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pindetail;
