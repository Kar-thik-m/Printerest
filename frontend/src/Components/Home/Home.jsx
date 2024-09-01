import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPinsAll } from '../../Action/Pins';

const Home = () => {
    const dispatch = useDispatch();
    const { item, loading, error } = useSelector((state) => state.pins);

    useEffect(() => {
        dispatch(GetPinsAll());
    }, [dispatch]);
    console.log(item)
    return (
        <div>
           home
        </div>
    );
}

export default Home;
