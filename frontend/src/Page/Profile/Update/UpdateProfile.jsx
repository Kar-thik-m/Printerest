import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../Action/Users';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Updateprofile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, file };

        setLoading(true);

        try {
            await dispatch(updateProfile(userData, id));
            setUsername("");
            setFile(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="max-w-[400px] mx-auto my-5 p-5 border border-gray-200 rounded-lg shadow-md bg-white"
        >
            <div className="mb-5 flex flex-col">
                <label htmlFor="username" className="text-base font-semibold text-gray-800 mb-1">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="p-2.5 border border-gray-300 rounded text-sm transition-colors duration-300 focus:border-blue-600 focus:outline-none"
                />
            </div>
            
            <div className="mb-5 flex flex-col">
                <label htmlFor="file" className="text-base font-semibold text-gray-800 mb-1">
                    Profile Image:
                </label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-2.5 border border-gray-300 rounded text-sm transition-colors duration-300 focus:border-blue-600 focus:outline-none"
                />
            </div>
            
            <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 text-white border-none py-2.5 px-4 rounded text-base font-bold cursor-pointer transition-colors duration-300 hover:bg-blue-700 w-full flex items-center justify-center min-h-[44px]"
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Update Profile"}
            </button>
        </form>
    );
};

export default Updateprofile;
