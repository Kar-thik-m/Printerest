import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginApi } from '../../Action/Users';
import Logo from "../../assets/logo.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated,loading } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(LoginApi(formData));

    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-full max-w-[400px] mx-auto my-[20px] p-[20px] rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] bg-white backdrop-blur-[10px]">
            <div className="w-full text-center p-[10px]">
                <img src={Logo} className="w-[50px] h-[50px]" alt="Logo" />
            </div>
            <h2 className="text-center text-[#333] mb-[20px]">Welcome to Printerest</h2>
            <h4 className="text-center text-[#333] mb-[20px]">Login</h4>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-[15px]">
                    <label htmlFor="email" className="text-[14px] text-[#555] mb-[5px] block font-bold">Email:</label>
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
                    <label htmlFor="password" className="text-[14px] text-[#555] mb-[5px] block font-bold">Password:</label>
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
                <div className="p-[10px]">
                    <b>Forget password</b>
                </div>
                <button type="submit" className="w-full p-[10px] border-none rounded-[4px] bg-[#007bff] text-white text-[16px] cursor-pointer transition-colors duration-300 hover:bg-[#0056b3] flex justify-center items-center" disabled={loading}>
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
                    <h4>You don't have an account? Click- <Link to="/register" className="no-underline text-[#5c8ce4] text-[16px] font-bold">Register</Link></h4>
                </div>
            </form>
        </div>
    );
};

export default Login;
