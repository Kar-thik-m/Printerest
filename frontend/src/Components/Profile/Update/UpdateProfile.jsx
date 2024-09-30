import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../Action/Users';
import UpStyle from "../Update/Update.module.css";
import { useParams } from 'react-router-dom';
const Updateprofile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { username, file };
        dispatch(updateProfile(userData, id));
        setUsername("");
        setFile(null)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={UpStyle.labeltext}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className={UpStyle.labelfile}>
                <label htmlFor="file">Profile Image:</label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <button type="submit" className={UpStyle.buttonupdate}>Update Profile</button>
        </form>
    );
};

export default Updateprofile;
