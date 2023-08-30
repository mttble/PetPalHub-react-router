import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../Context/userContext'
import './ChangeDetails.css'

function ChangeDetails() {
    const userContext = useContext(UserContext)
    
    const [data, setData] = useState({
        country: '',
        state: '',
        city: '',
        street: '',
        postalCode: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const renderAdditionalInputs = userContext.user?.role === 'carer';

    const updateUserDetails = async (e) => {
        e.preventDefault();

        try {
            if (userContext.user) {
            const userId = userContext.user._id
            const userRole = userContext.user.role
            const response = await axios.put(`/change-details/${userRole}/${userId}`, data, {
                withCredentials: true,
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Details updated successfully');
            }}
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className="centered-container-change-details">
                <h1>Change Details</h1>
            </div>
            <div>
                <form className="signup-user-form" onSubmit={updateUserDetails}>
                
                <label htmlFor="country">Country:</label>
                    <input value={ data.country } onChange={(e) => setData({...data, country: e.target.value})}
                    id="country"
                    placeholder="Country"
                />

                <label htmlFor="state">State:</label>
                    <input value={ data.state } onChange={(e) => setData({...data, state: e.target.value})}
                    id="state"
                    placeholder="State"
                />

                <label htmlFor="city">City:</label>
                    <input value={ data.city } onChange={(e) => setData({...data, city: e.target.value})}
                        id="city"
                        placeholder="City"
                    />
                {renderAdditionalInputs && (
                        <>
                        <label htmlFor="street">Street:</label>
                        <input
                            value={data.street}
                            onChange={(e) => setData({ ...data, street: e.target.value })}
                            id="street"
                            placeholder="Street Address"
                        />

                        <label htmlFor="postalCode">Postal Code:</label>
                        <input
                            value={data.postalCode}
                            onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                            id="postalCode"
                            placeholder="Postal Code"
                        />
                    </>
                    )}
                <label htmlFor="phoneNumber">phone number:</label>
                    <input
                        value={data.phoneNumber}
                        onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                        id="phoneNumber"
                        placeholder="phoneNumber"
                    />
                    <label htmlFor="email">email:</label>
                    <input
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        id="email"
                        placeholder="email"
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        type = "password"
                        id="password"
                        placeholder="**********"
                    />
                    <div>
                        <button type="submit">Update Details</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangeDetails;