import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../Action/Users';
import RStyle from "../Register/Register.module.css";
import Logo from "../../assets/logo.jpeg"
const Register = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
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
        dispatch(register(formData));
    };

    return (
        <div className={RStyle.whole}>
            <div className={RStyle.card}>
                <div className={RStyle.logo}>
                    <img src={Logo} className={RStyle.image}></img>
                </div>
                <h2 className={RStyle.title}>Welcome to Printerest</h2>
                <form onSubmit={handleSubmit} className={RStyle.form}>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="username" className={RStyle.label}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="email" className={RStyle.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <div className={RStyle.inputGroup}>
                        <label htmlFor="password" className={RStyle.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={RStyle.input}
                        />
                    </div>
                    <button type="submit" className={RStyle.button}>
                        Submit
                    </button>
                    <div className={RStyle.check}>
                        <h4>you Have Account Click- <Link to="/login" className={RStyle.Login}>Login</Link> </h4>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
