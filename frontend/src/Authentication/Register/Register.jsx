import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Action/Users';
import Logo from "../../assets/logo.jpeg";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const Register = () => {
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            image: name === 'image' ? files[0] : prevData.image,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('file', formData.image);

        dispatch(register(data));
    };

    useEffect(() => {
        if (loading === true) {
            navigate("/login");
        }
    }, [loading, navigate]);

    return (
        <div>
            <div className="w-full max-w-[400px] mx-auto my-[7vh] p-[20px] rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] bg-white">
                <div className="w-full text-center p-[10px]">
                    <img src={Logo} className="w-[50px] h-[50px]" alt="Logo" />
                </div>
                <h2 className="text-center text-[#333] mb-[20px]">Welcome to Printerest</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="mb-[15px]">
                        <label htmlFor="username" className="text-[14px] text-[#555] mb-[5px] block">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-[10px] border border-[#ccc] rounded-[4px] text-[14px] box-border"
                        />
                    </div>
                    <div className="mb-[15px]">
                        <label htmlFor="email" className="text-[14px] text-[#555] mb-[5px] block">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-[10px] border border-[#ccc] rounded-[4px] text-[14px] box-border"
                        />
                    </div>
                    <div className="mb-[15px]">
                        <label htmlFor="password" className="text-[14px] text-[#555] mb-[5px] block">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-[10px] border border-[#ccc] rounded-[4px] text-[14px] box-border"
                        />
                    </div>
                    <div className="mb-[15px]">
                        <label htmlFor="image" className="text-[14px] text-[#555] mb-[5px] block">Profile Image:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full p-[10px] border border-[#ccc] rounded-[4px] text-[14px] box-border file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-[#333] hover:file:bg-gray-200"
                        />
                    </div>
                    <button type="submit" className="w-full p-[10px] border-none rounded-[4px] bg-[#007bff] text-white text-[16px] cursor-pointer transition-colors duration-300 hover:bg-[#0056b3] flex justify-center items-center">
                        {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress size={24} color="inherit" sx={{ marginRight: '10px' }} />
                                Loading...
                            </Box>
                        ) : (
                            'Submit'
                        )}
                    </button>
                    <div>
                        <h4>Already have an account? Click- <Link to="/login" className="no-underline text-[#5c8ce4] text-[16px] font-bold">Login</Link></h4>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
