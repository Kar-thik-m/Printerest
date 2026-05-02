import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../Action/Users';
import { setNotification, clearNotification } from '../../../Slice/AuthSlice';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../../Components/Layouts/Loader/Loading';
import Notification from '../../../Components/Notifications/Notifications';

const Updateprofile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loaduser } = useSelector(state => state.user);
    const { message, status, showNotification, timer } = useSelector(state => state.user);


    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const imageRef = useRef(null);

    // Pre-fill existing data
    useEffect(() => {
        if (loaduser) {
            setUsername(loaduser.username || '');
            if (loaduser.userimage && loaduser.userimage.url) {
                setImagePreview(loaduser.userimage.url);
            }
        }
    }, [loaduser]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, file };

        setLoading(true);

        try {
            await dispatch(updateProfile(userData, id));
            navigate(`/profile/${id}`); // Go back to profile after success
        } catch (error) {
            console.error('Error updating profile:', error);
            dispatch(setNotification({
                message: error.message || 'Failed to update profile. Please try again.',
                status: 'error'
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-[32px] w-full max-w-4xl p-10 flex flex-col md:flex-row gap-10">

                    {/* Left Side: Profile Image Uploader */}
                    <div className="w-full md:w-5/12 flex flex-col items-center justify-center">
                        <div className="w-full max-w-[300px] aspect-square relative bg-gray-100 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all cursor-pointer overflow-hidden group">

                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white px-6 py-3 rounded-full font-bold text-gray-900 transition-transform transform scale-95 group-hover:scale-100">
                                            Change Photo
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6 flex flex-col items-center pointer-events-none">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <span className="text-base font-medium text-gray-700">Choose a profile photo</span>
                                </div>
                            )}

                            {/* Hidden file input */}
                            <input
                                type="file"
                                id="file"
                                ref={imageRef}
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    {/* Right Side: Details & Actions */}
                    <div className="w-full md:w-7/12 flex flex-col pt-2">

                        {/* Action Bar */}
                        <div className="flex justify-end mb-10">
                            <button
                                type="submit"
                                disabled={loading || !username.trim()}
                                className={`px-6 py-3 rounded-full font-bold text-[16px] transition-colors flex items-center justify-center ${loading || !username.trim() ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#e60023] hover:bg-[#ad081b] text-white'}`}
                            >
                                {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
                            </button>
                        </div>

                        {/* Form Inputs */}
                        <div className="flex flex-col gap-6 pl-2">

                            <div className="flex flex-col gap-2 mb-4">
                                <label htmlFor="username" className="text-sm font-semibold text-gray-600 uppercase tracking-wider ml-1">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 border-b-2 border-gray-200 focus:border-[#0077ff] pb-2 focus:outline-none transition-colors"
                                    required
                                />
                            </div>


                        </div>

                    </div>
                </form>

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

export default Updateprofile;
