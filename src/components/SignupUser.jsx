import React, { useState } from 'react'
import './SignupUser.css'

function SignupUser() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobile, setMobile] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }

    return (
        <>
            <div className="centered-container">
                <h1>Signup User Page</h1>
            </div>
            <form onSubmit={ handleSubmit }>

                <label htmlFor="firstName">First name</label>
                <input value={firstName} firstName="firstName" id="firstName" placeholder="First Name" />

                <label htmlFor="lastName">Last name</label>
                <input value={lastName} lastName="lastName" id="lastName" placeholder="Last Name" />

                <label htmlFor="mobile">Mobile Number</label>
                <input value={mobile} mobile="mobile" id="mobile" placeholder="Mobile Number" />

                <label htmlFor="email">email</label>
                <input value={ email } onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">password</label>
                <input value={ pass } onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                
                <button type="submit">Sign Up</button>
            </form>
            <button>Already have an account? Login here. </button>
        </>
    )
}

export default SignupUser