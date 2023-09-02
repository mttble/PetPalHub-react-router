import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { UserContext } from '../Context/userContext';
import { Link } from 'react-router-dom';

import './stylesheets/PetPalRequests.css';

function PetPalRequests() {
    const userContext = useContext(UserContext);
    
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchPetPalRequests = async () => {
            try {
                let response;
                
                if (userContext.user.role === 'carer') {
                    response = await axios.get('user/petPalRequests', {
                        params: { carerId: userContext.user._id }
                    });
                } else {
                    response = await axios.get('user/petPalRequests', {
                        params: { userId: userContext.user._id }
                    });
                }
    
                setBookings(response.data)
            } catch (error) {
                console.error("Error fetching PetPal requests:", error)
            }
        };
    
        fetchPetPalRequests()
    }, [userContext.user])
    
    
    

    const handleDeleteRequest = async (bookingId) => {
         // Ask the user to confirm the deletion
        const userConfirmed = window.confirm("Are you sure you want to delete this booking?")
        
        if (userConfirmed) {
            // logic to delete booking by its ID
            try {
                const response = await axios.delete(`user/booking/${bookingId}`)
                
                if (response.status === 200) {
                    // Successfully deleted the booking, now remove it from the UI
                    const newBookings = bookings.filter(booking => booking._id !== bookingId)
                    setBookings(newBookings);
                } else {
                    console.error('Failed to delete booking:', response.data)
                }
            } catch (error) {
                console.error('Error deleting booking:', error)
            }
        }
    };

    const handleDenyRequest = async (bookingId) => {
        try {
            const response = await axios.put('carer/booking/updateStatus', { bookingId, status: 'Denied' })
            if (response.status === 200) {
                console.log(`Successfully denied booking with ID: ${bookingId}`)
                const updatedBookings = bookings.map(booking => {
                    if (booking._id === bookingId) {
                        return {...booking, status: 'Denied'}
                    }
                    return booking;
                });
                setBookings(updatedBookings)
            }
        } catch (error) {
            // Handle error: e.g., show a message to the carer.
        }
    };

    const handleApproveRequest = async (bookingId) => {
        try {
            const response = await axios.put('carer/booking/updateStatus', { bookingId, status: 'Approved'})
            if (response.status === 200) {
                console.log(`Successfully approved booking with ID: ${bookingId}`)
                const updatedBookings = bookings.map(booking => {
                    if (booking._id === bookingId) {
                        return {...booking, status: 'Approved'}
                    }
                    return booking;
                });
                setBookings(updatedBookings);
            }
        } catch (error) {
            // Handle error: e.g., show a message to the carer.
        }
    };
    

    if (userContext.user) {
        const unapprovedBookings = bookings.filter(booking => booking.status !== 'Approved')

        if (unapprovedBookings.length === 0) {
            return <div className="no-booking-message">No Pending or Denied booking for now</div>
        }
    
        return (
            <div>
                <div className="petpal-request-heading">
                    <h2>PetPal Request</h2>
                </div>
                {bookings.map(booking => (
                    <div className="pet-pal-request-box-card" key={booking._id}>
                        <div className="pet-pal-request-container-card">
                            <h2>Booking For: {booking.userName}</h2>
                            <p>Email: {booking.userEmail}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Pet/s:</h5>
                            {booking.petIds.map((petId, index) => (
                                <div key={index}>
                                    <Link to={`/pet-details/${petId}`} className="pet-link">
                                        {booking.petNames[index]}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h2>Carer Name: {booking.carerName}</h2>
                            <p>Email: {booking.carerEmail}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Dates:</h5>
                            <p>Start Date: {booking.startDate}</p>
                            <p>End Date: {booking.endDate}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Time:</h5>
                            <p>Drop-off time: {booking.dropOffTime}</p>
                            <p>Pick-up time: {booking.pickUpTime}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h2>Booking Status: {booking.status}</h2>
                        </div>
                        <div className="pet-pal-request-textarea-container-card">
                            <label className="pet-pal-request-centered-label">
                            Message/Care Instructions:
                            </label>
                            <p>{booking.message}</p>
                        </div>
                        {userContext.user.role === 'user' && (
                            <div>
                                <Button className="size-sm-lg btn btn-danger" onClick={() => handleDeleteRequest(booking._id)}>Delete Request</Button>
                            </div>
                        )}
                        {userContext.user.role === 'carer' && (
                            <div>
                                <Button className="size-sm-lg btn" onClick={() => handleApproveRequest(booking._id)}>Approve</Button>
                                <Button className="size-sm-lg btn btn-danger" onClick={() => handleDenyRequest(booking._id)}>Deny</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className='dashboard-welcome'>Page not displayed</div>
        )
    }
}

export default PetPalRequests
