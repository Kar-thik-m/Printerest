import React, { useEffect, useState } from "react";
import ProStyle from "../Profile/Profile.module.css";
import { Link, useParams } from "react-router-dom";
import SavePin from "../SavePin/SavePin";
import { useDispatch, useSelector } from "react-redux";
import { getProfileunique, Follow, UnFollow } from "../../Action/Users";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Profile = () => {
    const [isCreating, setIsCreating] = useState(false);
    const { id } = useParams();
    const { loaduser, uservariant, loading } = useSelector((state) => state.user);
    const [modalType, setModalType] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfileunique(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (loaduser && uservariant) {
            setIsFollowing(loaduser.following.includes(uservariant._id));
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
            alert(error.message);
        }
    };

  
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            {loaduser && uservariant && (
                <div className={ProStyle.container}>
                    <div className={ProStyle.profiles}>
                        <img className={ProStyle.profileimage} src={uservariant.userimage.url} alt="Profile" />
                        <div className={ProStyle.profilename}>{uservariant.username}</div>
                        <div className={ProStyle.gmail}>{uservariant.email.split('@')[0]}</div>
                        <div className={ProStyle.follows}>
                            <div className={ProStyle.following} onClick={() => toggleModal('following')}>
                                <b>{uservariant.following.length}</b> following
                            </div>
                            <div className={ProStyle.followers} onClick={() => toggleModal('followers')}>
                                <b>{uservariant.followers.length}</b> followers
                            </div>
                        </div>
                        {loaduser._id === uservariant._id ? (
                            <Link className={ProStyle.edit} to={`/updateprofile/${loaduser._id}`}>
                                Edit Profile
                            </Link>
                        ) : (
                            <button onClick={handleFollowToggle} className={isFollowing ? ProStyle.unfollow : ProStyle.follow}>
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        )}
                    </div>

                    {(modalType === 'following' || modalType === 'followers') && (
                        <div className={ProStyle.backfollows}>
                            <div className={ProStyle.centerfollowing}>
                                <div className={ProStyle.showfollowing}>
                                    <div>
                                        {modalType === "following" ? `${uservariant.following.length} followings` : `${uservariant.followers.length} followers`}
                                    </div>
                                    <i onClick={() => toggleModal(modalType)} className="fa fa-times" aria-hidden="true"></i>
                                </div>
                                <div>
                                    {(modalType === 'following' ? uservariant.following : uservariant.followers).map((item) => (
                                        <div className={ProStyle.followingdetails} key={item._id}>
                                            <div>
                                                <img className={ProStyle.followingimgs} src={item.userimage.url} alt={item.username} />
                                                <div>{item.username}</div>
                                            </div>
                                            <button
                                                className={loaduser.following.includes(item._id) ? ProStyle.unfollow : ProStyle.follow}
                                                onClick={async () => {
                                                    const action = loaduser.following.includes(item._id) ? UnFollow : Follow;
                                                    try {
                                                        await dispatch(action(item._id));
                                                    } catch (error) {
                                                        alert(error.message);
                                                    }
                                                }}
                                            >
                                                {loaduser.following.includes(item._id) ? "Unfollow" : "Follow"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={ProStyle.saveandcreate}>
                        <Link onClick={() => setIsCreating(false)} style={{ textDecoration: !isCreating ? "underline" : "none" }}>
                            Save
                        </Link>
                        <Link onClick={() => setIsCreating(true)} style={{ textDecoration: isCreating ? "underline" : "none" }}>
                            Create
                        </Link>
                    </div>

                    <div>
                        {isCreating ? (
                            <div className={ProStyle.createlink}>
                                <Link to="/create">Create Pin</Link>
                            </div>
                        ) : (
                            <SavePin />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
