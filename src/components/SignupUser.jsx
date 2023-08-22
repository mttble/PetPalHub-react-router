import React, { useState } from 'react'
import './SignupUser.css'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function SignupUser() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        country: '',
        city: '',
        email: '',
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const {firstName, lastName, mobile, country, city, email, password} = data
        try {
            const {data} = await post('/register', {firstName, lastName, mobile, country, city, email, password
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Register Successfull, Weclome!')
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }}

    return (
        <>
            <div className="centered-container">
                <h1>Signup User Page</h1>
            </div>
            <form className="signup-user-form" onSubmit={ registerUser }>

                <label htmlFor="firstName">First name</label>
                <input value={ data.firstName } onChange={(e) => setData({...data, firstName: e.target.value})} id="firstName" placeholder="First Name" />

                <label htmlFor="lastName">Last name</label>
                <input value={ data.lastName } onChange={(e) => setData({...data, lastName: e.target.value})} id="lastName" placeholder="Last Name" />

                <label htmlFor="mobile">Mobile Number</label>
                <input value={ data.mobile } onChange={(e) => setData({...data, mobile: e.target.value})} id="mobile" placeholder="Mobile Number" />

                <label htmlFor="country">Country</label>
                <input value={ data.country } onChange={(e) => setData({...data, country: e.target.value})} type="text" id="country" placeholder="Country" />

                <label htmlFor="city">City</label>
                <input value={ data.city } onChange={(e) => setData({...data, city: e.target.value})} type="text" id="city" placeholder="City" />

                <label htmlFor="email">email</label>
                <input value={ data.email } onChange={(e) => setData({...data, email: e.target.value})} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

                <label htmlFor="password">password</label>
                <input value={ data.password } onChange={(e) => setData({...data, password: e.target.value})} type="password" placeholder="**********" id="password" name="password"/>
                
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignupUser