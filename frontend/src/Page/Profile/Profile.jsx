import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SavePin from "../../Components/SavePin/SavePin";
import { useDispatch, useSelector } from "react-redux";
import { getProfileunique, Follow, UnFollow } from "../../Action/Users";
import Loading from '../../Components/Layouts/Loader/Loading';
import Notification from "../../Components/Notifications/Notifications";
import { setNotification, clearNotification } from "../../Slice/AuthSlice";

const Profile = () => {
    const [activeTab, setActiveTab] = useState('saved'); // 'saved' or 'created'
    const { id } = useParams();
    const { loaduser, uservariant, loading } = useSelector((state) => state.user);
    const { message, status, showNotification, timer } = useSelector((state) => state.user);
    const [modalType, setModalType] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileunique(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (loaduser && uservariant) {
            setIsFollowing(loaduser.following.some(f => (f._id || f) === uservariant._id));
        }
    }, [loaduser, uservariant]);

    const toggleModal = (type) => {
        setModalType((prev) => (prev === type ? null : type));
    };

    const handleFollowToggle = async () => {
        const action = isFollowing ? UnFollow : Follow;
        try {
            await dispatch(action(uservariant._id));
            setIsFollowing(!isFollowing);
        } catch (error) {
            dispatch(setNotification({
                message: error.message || 'Action failed',
                status: 'error'
            }));
        }
    };

    if (loading || !uservariant) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="flex flex-col items-center pt-12 pb-6 px-4">
                <img 
                    src={uservariant.userimage?.url || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                
                <h1 className="text-[36px] font-bold text-gray-900 mb-1 tracking-tight">{uservariant.username}</h1>
                <div className="flex items-center gap-1.5 text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <span className="text-[16px]">@{uservariant.email?.split('@')[0] || uservariant.username}</span>
                </div>

                <div className="flex gap-2 text-[16px] font-semibold text-gray-900 mb-6">
                    <button onClick={() => toggleModal('followers')} className="hover:underline px-1">
                        {uservariant.followers?.length || 0} followers
                    </button>
                    <span className="text-gray-400">·</span>
                    <button onClick={() => toggleModal('following')} className="hover:underline px-1">
                        {uservariant.following?.length || 0} following
                    </button>
                </div>

                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-[#e9e9e9] rounded-full font-semibold text-[16px] text-gray-900 hover:bg-[#dcdcdc] transition-colors">
                        Share
                    </button>
                    {loaduser?._id === uservariant._id ? (
                        <Link to={`/updateprofile/${loaduser._id}`} className="px-6 py-3 bg-[#e9e9e9] rounded-full font-semibold text-[16px] text-gray-900 hover:bg-[#dcdcdc] transition-colors">
                            Edit Profile
                        </Link>
                    ) : (
                        <button 
                            onClick={handleFollowToggle} 
                            className={`px-6 py-3 rounded-full font-semibold text-[16px] transition-colors ${isFollowing ? 'bg-gray-900 text-white hover:bg-black' : 'bg-[#e60023] text-white hover:bg-[#ad081b]'}`}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-8 mt-2 mb-6">
                <button 
                    onClick={() => setActiveTab('created')} 
                    className={`pb-2 text-[16px] font-semibold transition-colors ${activeTab === 'created' ? 'border-b-[3px] border-gray-900 text-gray-900' : 'text-gray-600 hover:bg-gray-100 rounded-lg px-2 border-b-[3px] border-transparent'}`}
                >
                    Created
                </button>
                <button 
                    onClick={() => setActiveTab('saved')} 
                    className={`pb-2 text-[16px] font-semibold transition-colors ${activeTab === 'saved' ? 'border-b-[3px] border-gray-900 text-gray-900' : 'text-gray-600 hover:bg-gray-100 rounded-lg px-2 border-b-[3px] border-transparent'}`}
                >
                    Saved
                </button>
            </div>

            {/* Content Area */}
            <div className="max-w-[2000px] mx-auto px-4 pb-20">
                {activeTab === 'created' ? (
                    <div className="flex flex-col items-center justify-center py-20 mt-10">
                        <Link to="/create" className="w-16 h-16 bg-[#e9e9e9] rounded-full flex items-center justify-center text-gray-800 hover:bg-[#dcdcdc] transition-colors mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </Link>
                        <p className="text-xl font-medium text-gray-900">Create a Pin</p>
                    </div>
                ) : (
                    <SavePin />
                )}
            </div>

            {/* Follow/Following Modals */}
            {(modalType === 'following' || modalType === 'followers') && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity" onClick={() => toggleModal(modalType)}>
                    <div className="bg-white rounded-[32px] w-full max-w-[480px] max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        
                        <div className="p-6 pb-4 flex justify-center items-center relative z-10">
                            <h2 className="text-[20px] font-bold text-gray-900 text-center">
                                {modalType === "following" ? "Following" : "Followers"}
                            </h2>
                            <button onClick={() => toggleModal(modalType)} className="absolute right-6 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto flex-1 bg-white">
                            {(modalType === 'following' ? uservariant.following : uservariant.followers)?.length === 0 ? (
                                <p className="text-center text-gray-500 py-10 font-medium text-[16px]">Nothing to show yet.</p>
                            ) : (
                                (modalType === 'following' ? uservariant.following : uservariant.followers).map((item) => {
                                    const userId = item._id || item;
                                    const isItemFollowed = loaduser?.following?.some(f => (f._id || f) === userId);
                                    
                                    return (
                                        <div key={userId} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors mb-1 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <img src={item.userimage?.url || 'https://via.placeholder.com/150'} alt={item.username || 'User'} className="w-[50px] h-[50px] rounded-full object-cover" />
                                                <span className="font-bold text-gray-900 text-[16px]">{item.username || 'Pinterest User'}</span>
                                            </div>
                                            {loaduser?._id !== userId && (
                                                <button
                                                    className={`px-5 py-3 rounded-full font-bold text-[15px] transition-colors ${isItemFollowed ? 'bg-[#e9e9e9] text-gray-900 hover:bg-[#dcdcdc]' : 'bg-[#e60023] text-white hover:bg-[#ad081b]'}`}
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        const action = isItemFollowed ? UnFollow : Follow;
                                                        try {
                                                            await dispatch(action(userId));
                                                        } catch (error) {
                                                            dispatch(setNotification({
                                                                message: error.message || 'Action failed',
                                                                status: 'error'
                                                            }));
                                                        }
                                                    }}
                                                >
                                                    {isItemFollowed ? "Following" : "Follow"}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
            <Notification
                message={message}
                status={status}
                show={showNotification}
                duration={timer}
                onClear={clearNotification}
            />
        </div>
    );
};

export default Profile;
