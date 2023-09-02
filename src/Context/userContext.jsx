import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    function deleteAllCookies() {
        // Get all cookies for the current domain
        const cookies = document.cookie.split(';');
    
        // Iterate through cookies and delete each one
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    }
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
        deleteAllCookies()
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