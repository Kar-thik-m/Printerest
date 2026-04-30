import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-[1000]">
            <div className="relative flex justify-center items-center">
                <div className="absolute animate-ping w-12 h-12 rounded-full bg-[#E60023] opacity-20"></div>
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#E60023] rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg font-medium text-gray-700 tracking-wide animate-pulse">Loading...</p>
        </div>
    );
};

export default Loading;
