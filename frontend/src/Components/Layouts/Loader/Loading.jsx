import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-[1000]">
            <div className="w-[50px] h-[50px] border-[8px] border-black/10 border-l-[#3498db] rounded-full animate-spin"></div>
            <p className="mt-2.5 text-2xl text-[#555]">Loading...</p>
        </div>
    );
};

export default Loading;
