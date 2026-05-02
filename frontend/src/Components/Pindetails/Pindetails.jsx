import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Getpindetails,
    postcomments,
    DeletComment,
    Deletepin,
    DownloadPin
} from "../../Action/Pins.jsx";
import { PostSave } from "../../Action/savepin.jsx";
import { Follow, UnFollow } from "../../Action/Users.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../Components/Layouts/Loader/Loading';
import Notification from "../../Components/Notifications/Notifications";
import { setNotification, clearNotification } from "../../Slice/PinSlice";

const Pindetail = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [isFollowing, setIsFollowing] = useState(false);
    const [loadingState, setLoadingState] = useState({
        save: false,
        follow: false,
        unfollow: false,
        comment: false,
        delete: false,
        download: false,
    });

    const { loaduser } = useSelector((state) => state.user);
    const { pindetails, error, loading, message, status, showNotification, timer } = useSelector((state) => state.pins);
    const { saveitems } = useSelector((state) => state.save);

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Getpindetails(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (Array.isArray(saveitems)) {
            // Evaluates to a boolean to properly manage UI state
            const isPinSaved = saveitems.some(item =>
                Array.isArray(item.items) && item.items.some(savedpin => savedpin._id === id)
            );
            setIsSaved(isPinSaved);
        }
    }, [saveitems, id]);

    useEffect(() => {
        if (loaduser && pindetails?.user) {
            setIsFollowing(loaduser.following.includes(pindetails.user._id));
        }
    }, [loaduser, pindetails]);

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

    const handleSave = async () => {
        if (!isSaved) {
            setLoadingState(prev => ({ ...prev, save: true }));
            try {
                await dispatch(PostSave(pindetails._id));
                setIsSaved(true);
            } catch (error) {
                setIsSaved(false);
                dispatch(setNotification({
                    message: error.message || 'Failed to save pin',
                    status: 'error'
                }));
            } finally {
                setLoadingState(prev => ({ ...prev, save: false }));
            }
        }
    };

    const handleFollow = async () => {
        if (loaduser && pindetails?.user) {
            setLoadingState(prev => ({ ...prev, follow: true }));
            try {
                await dispatch(Follow(pindetails.user._id));
                setIsFollowing(true);
            } catch (error) {
                setIsFollowing(false);
                dispatch(setNotification({
                    message: error.message || 'Failed to follow user',
                    status: 'error'
                }));
            } finally {
                setLoadingState(prev => ({ ...prev, follow: false }));
            }
        }
    };

    const handleUnfollow = async () => {
        if (loaduser && pindetails?.user) {
            setLoadingState(prev => ({ ...prev, unfollow: true }));
            try {
                await dispatch(UnFollow(pindetails.user._id));
                setIsFollowing(false);
            } catch (error) {
                setIsFollowing(true);
                dispatch(setNotification({
                    message: error.message || 'Failed to unfollow user',
                    status: 'error'
                }));
            } finally {
                setLoadingState(prev => ({ ...prev, unfollow: false }));
            }
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (comment.trim() === "") return;

        setLoadingState(prev => ({ ...prev, comment: true }));
        try {
            await dispatch(postcomments(id, comment));
            await dispatch(Getpindetails(id));
            setComment("");
        } catch (error) {
            dispatch(setNotification({
                message: error.message || 'Failed to post comment',
                status: 'error'
            }));
        } finally {
            setLoadingState(prev => ({ ...prev, comment: false }));
        }
    };

    const deleteComment = async (commentId) => {
        setLoadingState(prev => ({ ...prev, comment: true }));
        try {
            await dispatch(DeletComment(id, commentId));
            await dispatch(Getpindetails(id));
        } catch (error) {
            dispatch(setNotification({
                message: error.message || 'Failed to delete comment',
                status: 'error'
            }));
        } finally {
            setLoadingState(prev => ({ ...prev, comment: false }));
        }
    };

    const deletePin = async () => {
        setLoadingState(prev => ({ ...prev, delete: true }));
        try {
            await dispatch(Deletepin(id));
            navigate('/');
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingState(prev => ({ ...prev, delete: false }));
        }
    };

    const handleDownload = async () => {
        setLoadingState(prev => ({ ...prev, download: true }));
        try {
            await dispatch(DownloadPin(pindetails.title, id));
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingState(prev => ({ ...prev, download: false }));
        }
    };

    if (error) {
        return <div className="text-center text-red-500 mt-20 text-xl font-bold">Error: {error.message || error}</div>;
    }

    if (!pindetails) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-gray-100 flex justify-center py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row max-w-5xl w-full max-h-[85vh]">

                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative group">
                        <img src={pindetails.image.url} alt={pindetails.title} className="w-full h-full object-cover block" />
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:w-1/2 flex flex-col p-6 md:p-8 h-full overflow-y-auto">

                        {/* Top Action Bar */}
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-50">
                            <div className="flex gap-4 items-center text-xl text-gray-700">
                                {/* Download Button */}
                                <button onClick={handleDownload} className="w-12 h-12 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                                    {loadingState.download ? <CircularProgress size={20} color="inherit" /> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm9-4v9H3v-9H1v11h22V12h-2z" /></svg>}
                                </button>

                                {/* Delete Button (If Owner) */}
                                {loaduser && loaduser._id === pindetails.user._id && (
                                    <button onClick={deletePin} className="w-12 h-12 cursor-pointer rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors" title="Delete Pin">
                                        {loadingState.delete ? <CircularProgress size={20} color="inherit" /> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                                    </button>
                                )}
                            </div>


                            {loaduser && loaduser._id !== pindetails.user._id && (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaved || loadingState.save}
                                    className={`px-6 py-3 rounded-full font-bold text-[16px] transition-colors ${isSaved ? 'bg-black text-white cursor-default' : 'bg-[#e60023] hover:bg-[#ad081b] text-white'}`}
                                >
                                    {loadingState.save ? <CircularProgress size={20} color="inherit" /> : (isSaved ? "Saved" : "Save")}
                                </button>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{pindetails.title}</h1>

                        {/* User Profile Banner */}
                        <div className="flex justify-between items-center mb-8">
                            <Link to={`/profile/${pindetails.user._id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                <img src={pindetails.user.userimage?.url || 'https://via.placeholder.com/150'} alt="User" className="w-12 h-12 rounded-full object-cover" />
                                <div className="flex flex-col">
                                    <span className="text-gray-900 font-bold text-[16px] hover:underline">{pindetails.user.username}</span>
                                    <span className="text-gray-500 text-[14px]">Owner</span>
                                </div>
                            </Link>

                            {loaduser && loaduser._id !== pindetails.user._id && (
                                <button
                                    onClick={isFollowing ? handleUnfollow : handleFollow}
                                    className={`px-5 py-3 rounded-full font-bold text-[16px] transition-colors ${isFollowing ? 'bg-gray-200 hover:bg-gray-300 text-gray-900' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
                                >
                                    {loadingState.follow || loadingState.unfollow ? <CircularProgress size={20} color="inherit" /> : (isFollowing ? "Following" : "Follow")}
                                </button>
                            )}
                        </div>

                        {/* Comments Section */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <h2 className="text-[20px] font-bold text-gray-900 mb-4">Comments</h2>

                            <div className="flex-1 overflow-y-auto mb-4 space-y-5 pr-2">
                                {pindetails.comments.length > 0 ? (
                                    pindetails.comments.map((c) => (
                                        <div key={c._id} className="flex gap-3 group">
                                            <img src={c.image || 'https://via.placeholder.com/150'} alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
                                            <div className="flex flex-col flex-1">
                                                <div className="flex items-baseline gap-2 flex-wrap">
                                                    <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                                                    <span className="text-gray-800 text-sm leading-relaxed">{c.content}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-gray-500 text-[12px]">{formatTimeAgo(c.createdAt)}</span>
                                                    {loaduser && loaduser._id === c.userId && (
                                                        <button onClick={() => deleteComment(c._id)} className="text-gray-400 cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {loadingState.comment ? <CircularProgress size={12} color="inherit" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No comments yet! Add one to start the conversation.</p>
                                )}
                            </div>

                            {/* Comment Input */}
                            <div className="pt-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
                                <img src={loaduser?.userimage?.url || 'https://via.placeholder.com/150'} alt="Current User" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                                <div className="flex-1 relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Add a comment"
                                        value={comment}
                                        onChange={handleCommentChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                                        className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-gray-300 transition-colors border-transparent focus:border-transparent rounded-full py-3 pl-5 pr-14 text-base outline-none"
                                    />
                                    {comment.trim() && (
                                        <button
                                            onClick={handleCommentSubmit}
                                            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-colors"
                                        >
                                            {loadingState.comment ? <CircularProgress size={16} color="inherit" /> : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification
                message={message}
                status={status}
                show={showNotification}
                duration={timer}
                onClear={clearNotification}
            />
        </>
    );
};

export default Pindetail;
