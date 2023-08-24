import React, { useState, useContext } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';

import './Login.css';


function Login() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext); // Get the setUser function from the context
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        setIsLoading(true);
        try {
            const response = await axios.post('/login', {
                email,
                password
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                userContext.setUser(response.data); // Update user data in global context
                localStorage.setItem('userData', JSON.stringify(response.data)); // Store user data in local storage
                toast.success('Logged in successfully')
                setData({});
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred while logging in.');
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="centered-container-login">
                <h1>Login Page</h1>
            </div>
            <form className="login-form" onSubmit={ loginUser }>
                <label htmlFor="email">email:</label>
                <input value={ data.email } onChange={(e) => setData({...data, email: e.target.value})} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="password">password:</label>
                <input value={ data.password } onChange={(e) => setData({...data, password: e.target.value})} type="password" placeholder="**********" id="password" name="password"/>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Log In'}</button>
            </form>
        </>
    );
}

export default Login;