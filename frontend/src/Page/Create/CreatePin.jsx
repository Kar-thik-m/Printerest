import React, { useRef, useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { createPin } from '../../Action/Pins'; 
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
        <div className="max-w-[500px] mx-auto my-12 p-8 rounded-[10px] bg-[#f9f9f9] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-6 flex flex-col gap-2">
                    <label htmlFor="title" className="text-[1.2rem] font-bold text-[#333]">Title</label>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        className="w-full px-[15px] py-[12px] text-base border-2 border-[#e1e1e1] rounded-md transition-colors duration-300 focus:border-[#0077ff] focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-6 flex flex-col gap-2">
                    <label htmlFor="image" className="text-[1.2rem] font-bold text-[#333]">Image</label>
                    <input
                        type="file"
                        id="image"
                        ref={imageRef}
                        className="w-full p-0 text-base border-2 border-[#e1e1e1] rounded-md transition-colors duration-300 focus:border-[#0077ff] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#e1e1e1] file:text-[#333] hover:file:bg-gray-300"
                        required
                    />
                </div>
                <button type="submit" className="p-3 text-[1.1rem] font-bold text-white bg-[#e63946] border-none rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#d62839] disabled:bg-[#cccccc] disabled:cursor-not-allowed flex justify-center items-center" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create Pin"}
                </button>
            </form>
        </div>
    );
};

export default CreatePin;
