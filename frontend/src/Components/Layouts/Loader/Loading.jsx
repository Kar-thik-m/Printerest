import React from 'react';
import Loadstyles from './Loading.module.css'; // Create a CSS module for styles

const Loading = () => {
    return (
        <div className={Loadstyles.loadingContainer}>
            <div className={Loadstyles.spinner}></div>
            <p className={Loadstyles.loadingText}>Loading...</p>
        </div>
    );
};

export default Loading;
