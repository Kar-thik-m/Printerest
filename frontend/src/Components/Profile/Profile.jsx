import React, { useEffect, useState } from "react";
import ProStyle from "../Profile/Profile.module.css";
import { Link } from "react-router-dom";
import CreatePin from "../Create/CreatePin";
import SavePin from "../SavePin/SavePin";
import { useSelector } from "react-redux";
const Profile = () => {
    const [data, setData] = useState(false);
    const { loaduser } = useSelector((state) => (state.user));
    console.log(loaduser);
    const CreateButton= () => {
        setData(true);
    }
    const SaveButton  = () => {
        setData(false)
    }

    return (
        <div className={ProStyle.container}>
            <div className={ProStyle.profiles}>
                <img className={ProStyle.profileimage} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                <div className={ProStyle.profilename}>{loaduser.username}</div>
                <div className={ProStyle.gmail}>{loaduser.email.split('@')[0]}</div>
                <div className={ProStyle.edit}>Edit Profile</div>
            </div>
            <div className={ProStyle.saveandcreade}>
                <Link onClick={SaveButton}>Save</Link>
                <Link onClick={CreateButton}>Create</Link>
            </div>
            <div>
                {data ? <div className={ProStyle.createlink}> <Link to={"/create"}>CreatePin</Link></div> : <SavePin />}
            </div>

        </div>
    );
}
export default Profile;