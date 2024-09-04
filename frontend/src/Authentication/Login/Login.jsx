import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { LoginApi } from '../../Action/Users';
import Lstyle from "../Login/Login.module.css";
import Logo from "../../assets/logo.jpeg"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, } = useSelector((state) => state.user)
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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(LoginApi(formData));
    };
    useEffect(() => {
        if (isAuthenticated) {
    navigate("/")
        }
    }, [isAuthenticated,navigate])
    return (

        <div className={Lstyle.card}>
            <div className={Lstyle.logo}>
                <img src={Logo} className={Lstyle.image}></img>
            </div>
            <h2 className={Lstyle.title}>Welcome to Printerest</h2>
            <h4 className={Lstyle.title}>Login</h4>
            <form onSubmit={handleSubmit} className={Lstyle.form}>
                <div className={Lstyle.inputGroup}>
                    <label htmlFor="email" className={Lstyle.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={Lstyle.input}
                    />
                </div>
                <div className={Lstyle.inputGroup}>
                    <label htmlFor="password" className={Lstyle.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={Lstyle.input}
                    />
                </div>
                <div className={Lstyle.forget}>
                    <b>Forget password</b>
                </div>
                <button type="submit" className={Lstyle.button}>
                    Submit
                </button>
                <div className={Lstyle.check}>
                    <h4>You Don't Have Account Click-<Link to="/register" className={Lstyle.register}>Register</Link> </h4>

                </div>
            </form>
        </div>

    );
};

export default Login;
