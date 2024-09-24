import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPinsAll } from '../../Action/Pins';
import Hstyle from "../Home/Home.module.css";
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { loaduser, isAuthenticated } = useSelector(state => state.user);
    const { item, loading, error } = useSelector(state => state.pins);

    useEffect(() => {
        dispatch(GetPinsAll());
    }, [dispatch]);

    return (
        <div className={Hstyle.container}>
            {loading && <p className={Hstyle.loading}>Loading...</p>}
            {error && <p className={Hstyle.error}>Error: {error}</p>}
            {item && item.length > 0 ? (
                item.map(pin => (
                    <div key={pin._id} className={Hstyle.pin}>
                        <img src={pin.image.url} alt={pin.title} className={Hstyle.pinImage} />
                        <div className={Hstyle.profileInfo}>
                            <div className={Hstyle.top}>
                            <img src={isAuthenticated && loaduser ? loaduser.userimage.url : ""} alt="User" className={Hstyle.profileImage} />

                                <div className={Hstyle.userName}>{pin.user.username}</div>
                            </div>
                            <div className={Hstyle.Viewlink}>
                                <Link to={`/pin/${pin._id}`}>View</Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                !loading && <p className={Hstyle.noPins}>No pins available</p>
            )}
        </div>
    );
}

export default Home;
