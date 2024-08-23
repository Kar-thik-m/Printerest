import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { LoginApi } from '../../Action/Users';
const Login = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit =(e) => {
        e.preventDefault(); 
      dispatch(LoginApi(formData));
    };

    return (
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" >
                    submit
                </button>
            </form>

        </div>
    );
};

export default Login;
