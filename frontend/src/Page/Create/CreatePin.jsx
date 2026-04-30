import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPin } from '../../Action/Pins';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../Components/Layouts/Loader/Loading';
import { Link } from 'react-router-dom';

const CreatePin = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { isAuthenticated, loaduser } = useSelector((state) => state.user);

    // Handle image preview generation
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const file = imageRef.current.files[0];

        if (!title || !file) {
            alert('Title and image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        setLoading(true);

        try {
            await dispatch(createPin(formData));
            titleRef.current.value = '';
            imageRef.current.value = '';
            setImagePreview(null);
        } catch (error) {
            console.error('Error creating pin:', error);
            alert('Failed to create pin. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-[32px] shadow-xl w-full max-w-4xl p-10 flex flex-col md:flex-row gap-10">

                    {/* Left Side: Image Uploader */}
                    <div className="w-full md:w-5/12 flex flex-col">
                        <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-[32px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-200 transition-all cursor-pointer overflow-hidden group">

                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white px-6 py-3 rounded-full font-bold text-gray-900 shadow-lg transition-transform transform scale-95 group-hover:scale-100">
                                            Change Image
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6 flex flex-col items-center pointer-events-none">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    </div>
                                    <span className="text-base font-medium text-gray-700">Choose a file or drag and drop it here</span>
                                    <span className="text-sm text-gray-500 mt-6 px-4 text-center">We recommend using high quality .jpg files less than 20MB</span>
                                </div>
                            )}

                            {/* Hidden file input placed over the entire container to catch clicks */}
                            <input
                                type="file"
                                id="image"
                                ref={imageRef}
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                                required={!imagePreview}
                            />
                        </div>
                    </div>

                    {/* Right Side: Details & Actions */}
                    <div className="w-full md:w-7/12 flex flex-col pt-2">

                        {/* Action Bar (Save Button) */}
                        <div className="flex justify-end mb-8">
                            <button
                                type="submit"
                                disabled={loading || !imagePreview}
                                className={`px-6 py-3 rounded-full font-bold text-[16px] transition-colors flex items-center justify-center ${loading || !imagePreview ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#e60023] hover:bg-[#ad081b] text-white shadow-md'}`}
                            >
                                {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
                            </button>
                        </div>

                        {/* Form Inputs */}
                        <div className="flex flex-col gap-6 pl-2">
                            {/* Title Input */}
                            <input
                                type="text"
                                id="title"
                                ref={titleRef}
                                placeholder="Add your title"
                                className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 border-b-2 border-gray-200 focus:border-[#0077ff] pb-2 focus:outline-none transition-colors"
                                required
                            />

                            {/* User Profile Banner */}
                            {loaduser && (
                                <div className="flex items-center gap-3 mt-4 mb-4">
                                    <Link to={`/profile/${loaduser._id}`}>
                                        <img
                                            src={loaduser.userimage?.url || 'https://via.placeholder.com/150'}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full object-cover border hover:opacity-80 transition-opacity"
                                        />
                                    </Link>
                                    <div className="flex flex-col">
                                        <Link to={`/profile/${loaduser._id}`} className="font-semibold text-gray-900 text-base hover:underline">
                                            {loaduser.username}
                                        </Link>
                                        <span className="text-gray-500 text-[14px]">Owner</span>
                                    </div>
                                </div>
                            )}


                        </div>

                    </div>
                </form>
            </div>
        </>
    );
};

export default CreatePin;
