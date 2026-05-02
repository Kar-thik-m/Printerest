import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPinsAll } from '../../Action/Pins';
import { Link } from 'react-router-dom';
import { Loaduser } from '../../Action/Users';
import Loading from '../../Components/Layouts/Loader/Loading';




const Home = () => {
    const dispatch = useDispatch();

    const { item, loading, error } = useSelector(state => state.pins);


    useEffect(() => {
        dispatch(GetPinsAll());
        dispatch(Loaduser)
    }, [dispatch]);

    return (
        <div className="max-w-[2000px] mx-auto p-4 md:p-6 lg:p-8">
            {loading && <Loading />}
            {error && <p className="text-center text-red-500 text-lg py-10 font-medium">Error: {error}</p>}

            {item && item.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-6">
                    {item.map(pin => (
                        <div key={pin._id} className="break-inside-avoid mb-4 md:mb-6 flex flex-col">
                            {/* Image and Hover Overlay */}
                            <div className="relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100 transition-all duration-300">

                                <Link to={`/pin/${pin._id}`} className="w-full h-auto object-cover block rounded-2xl">
                                    <img src={pin.image.url} alt={pin.title} className="w-full h-auto object-cover block rounded-2xl" loading="lazy" />
                                </Link>

                                <div className="absolute  inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-between p-3 rounded-2xl pointer-events-none">
                                    {/* Top: Save Button */}
                                    {/* <div className="flex justify-end pointer-events-auto">
                                        <Link className="bg-[#e60023] text-white font-bold py-3 px-5 rounded-full text-[15px] hover:bg-[#ad081b] transition-colors duration-200">
                                            Save
                                        </Link>
                                    </div> */}

                                    <div className="flex items-end justify-between pointer-events-auto">
                                        <div className="flex items-center gap-2">
                                            <Link to={`/profile/${pin.user._id}`}>
                                                <img src={pin.user.userimage?.url || 'https://via.placeholder.com/150'} alt="User" className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition-opacity" />
                                            </Link>
                                            <span className="text-white text-sm font-semibold truncate">{pin.user.username}</span>
                                        </div>
                                        {/* 
                                        <div className="flex gap-2">
                                            <button className="bg-white/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-colors duration-200">
                                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                            </button>
                                            <button className="bg-white/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-colors duration-200">
                                                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-2 mt-2 px-1">
                                <Link to={`/profile/${pin.user._id}`}>
                                    <img src={pin.user.userimage?.url || 'https://via.placeholder.com/150'} alt="User" className="w-7 h-7 rounded-full object-cover hover:opacity-80 transition-opacity shadow-sm" />
                                </Link>
                                <span className="text-gray-900 text-sm font-semibold truncate hover:underline cursor-pointer">{pin.user.username}</span>
                            </div> */}
                        </div>
                    ))}
                </div>
            ) : (
                !loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <p className="text-center text-xl text-gray-600 font-medium">No pins available</p>
                        <p className="text-center text-gray-500 mt-2">Try uploading some new pins to get started!</p>
                    </div>
                )
            )}
        </div>
    );
}

export default Home;
