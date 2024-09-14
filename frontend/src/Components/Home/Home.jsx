import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPinsAll } from '../../Action/Pins';
import Hstyle from "../Home/Home.module.css";
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { item, loading, error } = useSelector((state) => state.pins);

    useEffect(() => {
        dispatch(GetPinsAll());
    }, [dispatch]);

    return (
        <div className={Hstyle.container}>
            {loading && <p className={Hstyle.loading}>Loading...</p>}
            {error && <p className={Hstyle.error}>Error: {error}</p>}
            <div className={Hstyle.pinsContainer}>
                {item && item.length > 0 ? (
                    item.map(pin => (
                        <div key={pin._id} className={Hstyle.pin}>
                            <Link to={`/pin/${pin._id}`}>
                                <img src={pin.image.url} alt={pin.title} className={Hstyle.pinImage} />
                            </Link>

                            <div className={Hstyle.profileInfo}>
                                <img src={pin.image.url} className={Hstyle.profileImage} alt={pin.user.username} />
                                <div className={Hstyle.userName}>{pin.user.username}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className={Hstyle.noPins}>No pins available</p>
                )}
            </div>
        </div>
    );
}

export default Home;
