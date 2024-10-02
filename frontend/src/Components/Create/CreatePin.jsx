import React, { useRef, useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { createPin } from '../../Action/Pins'; 
import Cstyle from '../Create/Create.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CreatePin = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const file = imageRef.current.files[0];

        if (!title || !file) {
            alert('Title and image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        setLoading(true); 

        try {
            await dispatch(createPin(formData));
            titleRef.current.value = '';
            imageRef.current.value = '';
        } catch (error) {
            console.error('Error creating pin:', error);
            alert('Failed to create pin. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={Cstyle.formbody}>
            <form onSubmit={handleSubmit} className={Cstyle.form}>
                <div className={Cstyle.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        className={Cstyle.input}
                        required
                    />
                </div>
                <div className={Cstyle.formGroup}>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        ref={imageRef}
                        className={Cstyle.input}
                        required
                    />
                </div>
                <button type="submit" className={Cstyle.button} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Create Pin"}
                </button>
            </form>
        </div>
    );
};

export default CreatePin;
