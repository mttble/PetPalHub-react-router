import React, { useState } from 'react';
import './Login.css';


function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const loginUser = (e) => {
        e.preventDefault()
        console.log(email)
    }
    return (
        <>
            <div className="centered-container">
                <h1>Login Page</h1>
            </div>
            <form className="login-form" onSubmit={ loginUser }>
                <label htmlFor="email">email</label>
                <input value={ email } onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input value={ pass } onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}

export default Login;