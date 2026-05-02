import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Action/Users';
import { clearNotification } from '../../Slice/AuthSlice';
import Logo from "../../assets/logo.jpeg";
import CircularProgress from '@mui/material/CircularProgress';

import Loading from '../../Components/Layouts/Loader/Loading';
import Notification from '../../Components/Notifications/Notifications';


const Register = () => {
    const navigate = useNavigate();
    const { loading, message, status, showNotification, timer } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files && files[0]) {
            setFormData((prev) => ({ ...prev, image: files[0] }));
            setPreviewUrl(URL.createObjectURL(files[0]));
        } else if (name !== 'image') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (formData.image) data.append('file', formData.image);

        dispatch(register(data));
    };

    useEffect(() => {
        if (loading === true) {
            navigate("/login");
        }
    }, [loading, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl">
                <div className="flex flex-col items-center">
                    <img src={Logo} className="w-16 h-16 rounded-full object-cover mb-4" alt="Printerest Logo" />
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Join Printerest
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Find your next great idea
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 ml-1 mb-2">
                                Profile Picture
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex-shrink-0 flex justify-center items-center">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    )}
                                </div>
                                <label className="cursor-pointer bg-gray-100 py-2 px-4 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                                    <span>Choose file</span>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-[#E60023] hover:bg-[#ad081b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <CircularProgress size={20} color="inherit" className="mr-2" />
                                    Signing up...
                                </span>
                            ) : (
                                'Continue'
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already a member?{' '}
                        <Link to="/login" className="font-bold text-gray-900 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
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

export default Register;
