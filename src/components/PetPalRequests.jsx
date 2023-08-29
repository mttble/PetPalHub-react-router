import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './PetPalRequests.css';
import { Button } from 'react-bootstrap';
import { UserContext } from '../Context/userContext';
import { Link } from 'react-router-dom';

function PetPalRequests() {
    const userContext = useContext(UserContext);
    
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (userContext.user && userContext.user._id) {
                    // Determine path and paramKey based on the role
                    let path, paramKey;
                    if (userContext.user.role === 'user') {
                        path = 'user/bookings';
                        paramKey = 'userId';
                    } else {
                        path = 'carer/bookings';
                        paramKey = 'carerId';
                    }
    
                    const response = await axios.get(path, {
                        params: {
                            [paramKey]: userContext.user._id,
                        },
                    });
    
                    if (response.status === 200) {
                        setBookings(response.data);
                    } else {
                        console.error('Failed to fetch booking data:', response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };
    
        fetchBookings();
    }, [userContext.user]);
    
    

    const handleDeleteRequest = async (bookingId) => {
         // Ask the user to confirm the deletion
        const userConfirmed = window.confirm("Are you sure you want to delete this booking?");
        
        if (userConfirmed) {
            // logic to delete booking by its ID
            try {
                const response = await axios.delete(`user/booking/${bookingId}`);
                
                if (response.status === 200) {
                    // Successfully deleted the booking, now remove it from the UI
                    const newBookings = bookings.filter(booking => booking._id !== bookingId);
                    setBookings(newBookings);
                } else {
                    console.error('Failed to delete booking:', response.data);
                }
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        }
    };

    const handleDenyRequest = async (bookingId) => {
        try {
            const response = await axios.put('carer/booking/updateStatus', { bookingId, status: 'Denied' });
            if (response.status === 200) {
                console.log(`Successfully denied booking with ID: ${bookingId}`);
              // Handle successful denial: e.g., remove booking from list or update its status.
            }
        } catch (error) {
            // Handle error: e.g., show a message to the carer.
        }
    };

    const handleApproveRequest = async (bookingId) => {
        try {
            const response = await axios.put('carer/booking/updateStatus', { bookingId, status: 'Approved'});
            if (response.status === 200) {
                console.log(`Successfully approved booking with ID: ${bookingId}`)
              // Handle successful approval: e.g., remove booking from list or update its status.
            }
        } catch (error) {
            // Handle error: e.g., show a message to the carer.
        }
    };
    

    if (userContext.user) {
        if (bookings.length === 0) {
            return <div className="no-booking-message">No booking for now</div>;
        }

        return (
            <div>
                {bookings.map(booking => (
                    <div className="pet-pal-request-box-card" key={booking._id}>
                        <h2>PetPal Request</h2>
                        <h3>Booking For: </h3>
                        <div className="pet-pal-request-container-card">
                        <h5>For Pets:</h5>
                        {booking.petIds.map((petId, index) => (
                            <div key={index}>
                                <Link to={`/pet-details/${petId}`} className="pet-link">
                                    {booking.petNames[index]}
                                </Link>
                            </div>
                        ))}
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h2>Carer name: {booking.carerName}</h2>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h2>User name: {booking.userName}</h2>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Dates:</h5>
                            <p>Start Date: {booking.startDate}</p>
                            <p>End Date: {booking.endDate}</p>
                        </div>
                        <div className="pet-pal-request-container-card">
                            <h5>For Time:</h5>
                            <p>Pick-up time: {booking.pickUpTime}</p>
                            <p>Drop-off time: {booking.dropOffTime}</p>
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
        );
    }
}

export default PetPalRequests;
