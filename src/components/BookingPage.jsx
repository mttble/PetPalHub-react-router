import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/userContext';
import './stylesheets/BookingPage.css';

function BookingPage() {
    const userContext = useContext(UserContext)
    const [confirmedBookings, setConfirmedBookings] = useState([])

    useEffect(() => {
        if (!userContext.user) return; // Early exit if user is not defined

        const fetchBookings = async () => {
            let response;
            try {
                if (userContext.user.role === 'carer') {
                    // Fetch bookings based on carerId
                    response = await axios.get('carer/confirmedBookings', {
                        params: { carerId: userContext.user._id }
                    });
                } else {
                    // Fetch bookings based on userId
                    response = await axios.get('user/confirmedBookings', {
                        params: { userId: userContext.user._id }
                    });
                }

                setConfirmedBookings(response.data)
            } catch (error) {
                console.error("Error fetching confirmed bookings:", error)
            }
        };

        fetchBookings();
    }, [userContext.user?._id, userContext.user?.role])  // Dependency array adjusted

    if (!userContext.user) {
        return <div>Loading...</div>
    }


    const handleDeleteBooking = async (bookingId) => {
        // Ask the user to confirm the deletion
        const userConfirmed = window.confirm("Are you sure you want to delete this booking?");
    
        if (userConfirmed) {
            try {
                const response = await axios.delete(`user/booking/${bookingId}`);
    
                if (response.status === 200) {
                    // Successfully deleted the booking, now update the state to remove it
                    setConfirmedBookings(prevBookings =>
                        prevBookings.filter(booking => booking._id !== bookingId)
                    );
                    console.log('Booking deleted successfully');
                } else {
                    console.error('Failed to delete booking:', response.data);
                }
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        }
    };

    return (
        <div>
            <h2>Confirmed Bookings</h2>
            {confirmedBookings
                .filter(booking => booking.status === 'Approved')
                .map((booking) => {
                    const currentDate = new Date();
                    const endDate = new Date(booking.endDate);
                    const canDelete = currentDate > endDate;

                    return (
                        <div className="pet-pal-request-box-card" key={booking._id}>
                            <div className="pet-pal-request-box-card" key={booking._id}>
                <h3>Booking For: {booking.userName}</h3>

                <div className="pet-pal-request-container-card">
                    <h5>For Pets:</h5>
                    <p>{booking.petNames.join(', ')}</p>
                </div>

                {booking.carerName && (
                    <div className="pet-pal-request-container-card">
                        <h2>Carer Name: {booking.carerName}</h2>
                        <p>Carer Email: {booking.carerEmail}</p>
                    </div>
                )}

                <div className="pet-pal-request-container-card">
                    <h2>User Name: {booking.userName}</h2>
                    <p>User Email: {booking.userEmail}</p>
                </div>

                <div className="pet-pal-request-container-card">
                    <h5>For Dates:</h5>
                    <p>Start Date: {booking.startDate}</p>
                    <p>End Date: {booking.endDate}</p>
                </div>

                <div className="pet-pal-request-container-card">
                    <h5>For Time:</h5>
                    <p>Pick-up Time: {booking.pickUpTime}</p>
                    <p>Drop-off Time: {booking.dropOffTime}</p>
                </div>

                {booking.status && (
                    <div className="pet-pal-request-container-card">
                        <h2>Booking Status: {booking.status}</h2>
                    </div>
                )}

                <div className="pet-pal-request-textarea-container-card">
                    <label className="pet-pal-request-centered-label">Message/Care Instructions:</label>
                    <p>{booking.message}</p>
                </div>

            </div>

                            {canDelete ? (
                                <button
                                    className="delete-booking-button"
                                    onClick={() => handleDeleteBooking(booking._id)}
                                >
                                    Delete Booking
                                </button>
                            ) : (
                                <p>This booking cannot be deleted until after the End Date.</p>
                            )}
                        </div>
                    );
                })}
        </div>
    );
}

export default BookingPage
