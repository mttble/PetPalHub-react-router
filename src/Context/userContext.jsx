import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    const expireCookies = (cookieNames) => {
        const expirationDate = new Date(0).toUTCString(); // Set expiration to the past
    
        for (const cookieName of cookieNames) {
            document.cookie = `${cookieName}=; expires=${expirationDate}; path=/; secure; sameSite=none`;
            console.log(`Cookie '${cookieName}' removed`);
        }
    };
    
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
        navigate('/');
    };

    useEffect(() => {
        if (!user)  {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};