import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateSave } from "../../Action/Savepin";
import { Link } from "react-router-dom";
import SaveStyle from "../SavePin/Save.module.css";

const SavePin = () => {
    const dispatch = useDispatch();
    const { saveitems, loading } = useSelector((state) => state.save);

    useEffect(() => {
        dispatch(CreateSave());
    }, [dispatch]);

    return (
        <div className={SaveStyle.container}>

            {loading && <p>Loading...</p>}
            <div className={SaveStyle.savedItem}>
                {saveitems && saveitems.length > 0 ? (
                    saveitems.map((saveItem) => (
                        <div key={saveItem.user._id} className={SaveStyle.cart}  >
                        <Link to={`/save/${saveItem._id}`}>
                            {saveItem.items.map((item) => (
                                <div key={item._id} >
                                   
                                    
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={SaveStyle.itemImage}
                                        />
                                    

                                </div>
                            ))}
                            <div className={SaveStyle.profileinfo}>
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className={SaveStyle.profileImage} />
                                <div className={SaveStyle.userName}>{saveItem.user.username}</div>
                            </div>
                            </Link>
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
