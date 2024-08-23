import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPin } from '../../Action/Pins';

const CreatePin = () => {
    const [formData, setFormData] = useState({ title: '', image: '' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPin(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="image">Image URL</label>
                <input
                    type="text"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Create Pin</button>
        </form>
    );
};

export default CreatePin;
