import React, { useState } from 'react'

function SignupCarer() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }

    return (
        <>
            <div className="centered-container">
                <h1>Signup Carer Page</h1>
            </div>
            <form className="signup-user-form" onSubmit={handleSubmit}>

                <label htmlFor="firstName">First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} firstName="firstName" id="firstName" placeholder="First Name" />

                <label htmlFor="lastName">Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} lastName="lastName" id="lastName" placeholder="Last Name" />

                <label htmlFor="mobile">Mobile Number</label>
                <input value={mobile} onChange={(e) => setMobile(e.target.value)} mobile="mobile" id="mobile" placeholder="Mobile Number" />

                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" id="dateOfBirth" />
                
                <label htmlFor="country">Country</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" id="country" placeholder="Country" />
                
                <label htmlFor="state">State</label>
                <input value={state} onChange={(e) => setState(e.target.value)} type="text" id="state" placeholder="State" />

                <label htmlFor="city">City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" placeholder="City" />

                <label htmlFor="street">Street</label>
                <input value={street} onChange={(e) => setStreet(e.target.value)} type="text" id="street" placeholder="Street Address" />

                <label htmlFor="postalCode">Postal Code</label>
                <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" id="postalCode" placeholder="Postal Code" />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignupCarer