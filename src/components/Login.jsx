import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

import './Login.css';


function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await axios.post('/login', {
                email,
                password
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({});
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred while logging in.');
            }
        }
    };

    return (
        <>
            <div className="centered-container">
                <h1>Login Page</h1>
            </div>
            <form className="login-form" onSubmit={ loginUser }>
                <label htmlFor="email">email:</label>
                <input value={ data.email } onChange={(e) => setData({...data, email: e.target.value})} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="password">password:</label>
                <input value={ data.password } onChange={(e) => setData({...data, password: e.target.value})} type="password" placeholder="**********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}

export default Login;