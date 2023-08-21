import React, { useState } from 'react'
import './SignupUser.css'

function SignupUser() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const registerUser = (e) => {
        e.preventDefault()
        console.log(email)
    }

    return (
        <>
            <div className="centered-container">
                <h1>Signup User Page</h1>
            </div>
            <form className="signup-user-form" onSubmit={ registerUser }>

                <label htmlFor="firstName">First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />

                <label htmlFor="lastName">Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />

                <label htmlFor="mobile">Mobile Number</label>
                <input value={mobile} onChange={(e) => setMobile(e.target.value)} id="mobile" placeholder="Mobile Number" />

                <label htmlFor="country">Country</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" id="country" placeholder="Country" />

                <label htmlFor="city">City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" placeholder="City" />


                <label htmlFor="email">email</label>
                <input value={ email } onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">password</label>
                <input value={ pass } onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignupUser