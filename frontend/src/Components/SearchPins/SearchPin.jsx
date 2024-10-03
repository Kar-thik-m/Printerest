import React from "react";
import SPStyle from "../SearchPins/SearchPin.module.css";
import Loading from "../Layouts/Loader/Loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const SearchPin = () => {

    const { searchResults, loading, error } = useSelector(state => state.pins);




    console.log(searchResults);


    return (
        <div className={SPStyle.container}>


            {loading && <Loading />}
            {error && <p className={SPStyle.error}>Error: {error}</p>}

            {searchResults && searchResults.length > 0 ? (
                searchResults.map(pin => (
                    <div key={pin._id} className={SPStyle.pin}>
                        <img src={pin.image.url} alt={pin.title} className={SPStyle.pinImage} />
                        <div className={SPStyle.profileInfo}>
                            <div className={SPStyle.top}>
                                <Link to={`/profile/${pin.user._id}`}>
                                    <img src={pin.user.userimage.url} alt="User" className={SPStyle.profileImage} />
                                </Link>
                                <div className={SPStyle.userName}>{pin.user.username}</div>
                            </div>
                            <div className={SPStyle.Viewlink}>
                                <Link to={`/pin/${pin._id}`}>View</Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                !loading && <p className={SPStyle.noPins}>No pins available</p>
            )}
        </div>
    );
}

export default SearchPin;
