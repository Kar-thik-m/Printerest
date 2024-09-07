import React, { useEffect, useState } from "react";
import { Url } from "../../config";

const GetProfile = () => {

    useEffect(() => {
       
       
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${Url}/load/profile`,{withCredentials: true});
                const data = await response.json();
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);



    return (
        <div>
            ll
        </div>
    );
};

export default GetProfile;
