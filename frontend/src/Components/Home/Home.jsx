import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPinsAll } from '../../Action/Pins';
import Hstyle from "../Home/Home.module.css";
import { Link } from 'react-router-dom';
import { Loaduser } from '../../Action/Users';
import Loading from '../Layouts/Loader/Loading';

const Home = () => {
    const dispatch = useDispatch();

    const { item, loading, error } = useSelector(state => state.pins);

    useEffect(() => {
        dispatch(GetPinsAll());
        dispatch(Loaduser)
    }, [dispatch]);

    return (
        <div className={Hstyle.container}>
            {loading && <Loading />}
            {error && <p className={Hstyle.error}>Error: {error}</p>}
            {item && item.length > 0 ? (
                item.map(pin => (
                    <div key={pin._id} className={Hstyle.pin}>
                        <img src={pin.image.url} alt={pin.title} className={Hstyle.pinImage} />
                        <div className={Hstyle.profileInfo}>
                            <div className={Hstyle.top}>

                                <Link to={`/profile/${pin.user._id}`}  >  <img src={pin.user.userimage.url} alt="User" className={Hstyle.profileImage} /></Link>

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
