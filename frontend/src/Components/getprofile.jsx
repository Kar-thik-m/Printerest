import React, { useEffect } from "react";
import { Url } from "../../config";

const GetProfile = () => {

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');
                console.log(token);
                
                // Check if token exists
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const response = await fetch(`${Url}/profile`, {
                    headers: {
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

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
            Profile Information
        </div>
    );
};

export default GetProfile;
