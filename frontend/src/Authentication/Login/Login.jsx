import React, { useState } from 'react';
import { Url } from '../../../Config';

const Login = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(`${Url}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {

                alert("faill")

            }
            await response.json();
            alert("sucessfull")
            setFormData({

                email: '',
                password: '',
            })
        } catch (error) {
            alert(error);
            console.error('Error:', error);

        }
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
