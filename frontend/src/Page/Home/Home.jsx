import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPinsAll } from '../../Action/Pins';
import { Link } from 'react-router-dom';
import { Loaduser } from '../../Action/Users';
import Loading from '../../Components/Layouts/Loader/Loading';
import Notifications from '../../Components/Notifications/Notifications';

const Home = () => {
    const dispatch = useDispatch();

    const { item, loading, error } = useSelector(state => state.pins);

    useEffect(() => {
        dispatch(GetPinsAll());
        dispatch(Loaduser)
    }, [dispatch]);

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] auto-rows-[300px] gap-4 p-4">

            {loading && <Loading />}
            {error && <p className="text-center text-red-500 text-lg">Error: {error}</p>}
            {item && item.length > 0 ? (
                item.map(pin => (
                    <div key={pin._id} className="group relative rounded-lg overflow-hidden transition-transform duration-200 ease-in hover:scale-105 h-auto">
                        <img src={pin.image.url} alt={pin.title} className="w-full h-[30vh] md:h-[40vh] object-cover" />
                        <div className="absolute top-0 left-0 w-full h-[40vh] text-[#f0f8ff] bg-black/70 rounded-lg opacity-0 transition-opacity duration-300 ease-in group-hover:opacity-100 text-[14px] md:text-base">
                            <div className="flex justify-between items-center p-2">

                                <Link to={`/profile/${pin.user._id}`}  >  <img src={pin.user.userimage.url} alt="User" className="m-2.5 mr-2 w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-full object-cover p-[1px] bg-[#ff0000]" /></Link>

                                <div className="m-4 cursor-pointer font-bold py-2 px-4 md:py-2.5 md:px-5 bg-[#eba6a6] text-white no-underline rounded-xl transition-all duration-300 ease-in hover:bg-[#dd2a45] hover:-translate-y-0.5 text-[14px] md:text-base">{pin.user.username}</div>
                            </div>
                            <div>
                                <Link to={`/pin/${pin._id}`} className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 md:py-2.5 md:px-5 bg-[#eba6a6] text-white no-underline rounded-xl transition-all duration-300 ease-in hover:bg-[#dd2a45] hover:-translate-x-1/2 hover:-translate-y-[52%] text-[14px] md:text-base">View</Link>
                            </div>
                        </div>
                    </div>
                ))

            ) : (
                !loading && <p className="text-center text-lg text-[#777]">No pins available</p>
            )}

        </div>
    );
}

export default Home;
