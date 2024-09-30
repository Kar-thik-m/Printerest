import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateSave } from "../../Action/savepin";

import SaveStyle from "../SavePin/Save.module.css";

const SavePin = () => {
    const dispatch = useDispatch();
    const { saveitems, loading } = useSelector((state) => state.save);
    const { loaduser, uservariant } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(CreateSave());
    }, [dispatch]);

    return (
        <div className={SaveStyle.container}>

            {loading && <p>Loading...</p>}
            <div className={SaveStyle.savedItem}>
                {saveitems && loaduser._id === uservariant._id && saveitems.length > 0 ? (
                    saveitems.map((saveItem) => (
                        <div key={saveItem.user._id} className={SaveStyle.cart}  >

                            {saveItem.items.map((item) => (
                                <div key={item._id} >


                                    <img
                                        src={item.image.url}
                                        alt={item.title}
                                        className={SaveStyle.itemImage}
                                    />


                                </div>
                            ))}


                        </div>
                    ))
                ) : (
                    <p>No saved data available.</p>
                )}
            </div>
        </div>
    );
};

export default SavePin;
