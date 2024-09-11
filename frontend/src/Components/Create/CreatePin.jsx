import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPin } from '../../Action/Pins';
import Cstyle from "../Create/Create.module.css";

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
        setFormData({
            title: '',
             image: '' 
        })
        dispatch(createPin(formData));
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
       </div>
    );
};

export default CreatePin;
