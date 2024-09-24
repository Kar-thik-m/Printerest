import React, { useState } from "react";
import ProStyle from "../Profile/Profile.module.css";
import { Link } from "react-router-dom";
import SavePin from "../SavePin/SavePin";
import { useSelector } from "react-redux";

const Profile = () => {
    const [data, setData] = useState(false);
    const { loaduser } = useSelector((state) => state.user);
   
    const CreateButton = () => {
        setData(true);
    };
    
    const SaveButton = () => {
        setData(false);
    };

    return (
        <>
            {loaduser && (
                <div className={ProStyle.container}>
                    <div className={ProStyle.profiles}>
                        <img className={ProStyle.profileimage} src={loaduser.userimage.url} alt="Profile" />
                        <div className={ProStyle.profilename}>{loaduser.username}</div>
                        <div className={ProStyle.gmail}>{loaduser.email.split('@')[0]}</div>
                        <div className={ProStyle.edit}>Edit Profile</div>
                    </div>
                    <div className={ProStyle.saveandcreade}>
                        <Link
                            onClick={SaveButton}
                            style={{ textDecoration: data === false ? "underline" : "none" }}
                        >
                            Save
                        </Link>
                        <Link
                            onClick={CreateButton}
                            style={{ textDecoration: data === true ? "underline" : "none" }}
                        >
                            Create
                        </Link>
                    </div>
                    <div>
                        {data ? (
                            <div className={ProStyle.createlink}>
                                <Link to={"/create"}>CreatePin</Link>
                            </div>
                        ) : (
                            <SavePin />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
