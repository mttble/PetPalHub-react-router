import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        // Clear user data and cookies
        setUser(null);
        localStorage.removeItem('userData');

        // Remove the cookies
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [name] = cookie.split('=');
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; sameSite=none`;
            console.log('cookie removed')
        }
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        const userRole = storedUserData ? JSON.parse(storedUserData).role : null;
    
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        } else if (userRole === 'user') {
            axios
                .get(`/profile/user`, { withCredentials: true })
                .then(({ data }) => {
                    setUser(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error fetching user profile ' + error);
                });
        } else if (userRole === 'carer') {
            axios
                .get(`/profile/carer`, { withCredentials: true })
                .then(({ data }) => {
                    setUser(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                })
                .catch(error => {
                    console.error('Error fetching carer profile ' + error);
                });
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};