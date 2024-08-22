
import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { GetPinsAll } from "../../Action/Pins";
const Home = () => {
    const { product } = useSelector((state) => state.pins);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetPinsAll);
    }, [dispatch])
    return (
        <div>
         home
        </div>
    );
}
export default Home;