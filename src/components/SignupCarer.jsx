import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignupCarer() {
    
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: {
            country: '',
            state: '',
            city: '',
            street: '',
            postalCode: '',
        },
        email: '',
        password: '',
    })

    const registerCarer = async (e) => {
        e.preventDefault()

        const dobParts = data.dateOfBirth.split('-');
        const formattedDob = `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`;

        const {firstName, lastName, phoneNumber, dateOfBirth, address: {country, state, city, street, postalCode}, email, password} = data
        try {
            if (!firstName || !lastName) {
                toast.error("First name and last name are required.");
                return;
            }
    
            if (!phoneNumber) {
                toast.error("Phone number is required.");
                return;
            }
    
            if (!dateOfBirth) {
                toast.error("Date of Birth is required.");
                return;
            }
    
            if (!country) {
                toast.error("Country is required.");
                return;
            }
    
            if (!state) {
                toast.error("State is required.");
                return;
            }
    
            if (!city) {
                toast.error("City is required.");
                return;
            }
    
            if (!street) {
                toast.error("Street address is required.");
                return;
            }
    
            if (!postalCode) {
                toast.error("Postal code is required.");
                return;
            }
    
            if (!email) {
                toast.error("Email is required.");
                return;
            }
            const role = 'carer'
            const {data} = await axios.post('http://localhost:5505/register', {firstName, lastName, phoneNumber, dateOfBirth: formattedDob, country, state, city, street, postalCode, email, password, role
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Register Successful, Welcome!')
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
        }}

    return (
        <>
            <div className="centered-container">
                <h1>Signup Carer Page</h1>
            </div>
            <form className="signup-user-form" onSubmit={ registerCarer }>

                <label htmlFor="firstName">First name:</label>
                <input value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})} id="firstName" placeholder="First Name" />

                <label htmlFor="lastName">Last name:</label>
                <input value={data.lastName} onChange={(e) => setData({...data, lastName: e.target.value})} id="lastName" placeholder="Last Name" />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input value={data.phoneNumber} onChange={(e) => setData({...data, phoneNumber: e.target.value})} id="mobile" placeholder="Mobile Number" />

                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input value={data.dateOfBirth} onChange={(e) => setData({...data, dateOfBirth: e.target.value})} type="date" id="dateOfBirth" />
                
                <label htmlFor="country">Country:</label>
                <input value={data.address.country} onChange={(e) => setData({...data, address: {...data.address, country: e.target.value}})} type="text" id="country" placeholder="Country" />
                
                <label htmlFor="state">State:</label>
                <input value={data.address.state} onChange={(e) => setData({...data, address: {...data.address, state: e.target.value}})} type="text" id="state" placeholder="State" />

                <label htmlFor="city">City:</label>
                <input value={data.address.city} onChange={(e) => setData({...data, address: {...data.address, city: e.target.value}})} type="text" id="city" placeholder="City" />

                <label htmlFor="street">Street:</label>
                <input value={data.address.street} onChange={(e) => setData({...data, address: {...data.address, street: e.target.value}})} type="text" id="street" placeholder="Street Address" />

                <label htmlFor="postalCode">Postal Code:</label>
                <input value={data.address.postalCode} onChange={(e) => setData({...data, address: {...data.address, postalCode: e.target.value}})} type="text" id="postalCode" placeholder="Postal Code" />

                <label htmlFor="email">Email:</label>
                <input value={data.email} onChange={(e) => setData({...data, email: e.target.value})} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">Password:</label>
                <input value={data.password} onChange={(e) => setData({...data, password: e.target.value})} type="password" placeholder="**********" id="password" name="password"/>
                
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignupCarer