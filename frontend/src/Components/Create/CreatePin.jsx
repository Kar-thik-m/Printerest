import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPin } from '../../Action/Pins';
import Cstyle from "../Create/Create.module.css";

const CreatePin = () => {
    const [formData, setFormData] = useState({ title: '', image: null });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: id === 'image' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            await dispatch(createPin(formDataToSend));
            setFormData({ title: '', image: null });
            alert('Pin created successfully!');
        } catch (error) {
            console.error('Error creating pin:', error);
            alert('Failed to create pin. Please try again.');
        }
    };

    return (
        <div className={Cstyle.formbody}>
            <form onSubmit={handleSubmit} className={Cstyle.form}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Pin</button>
            </form>
        </div>
    );
};

export default CreatePin;
