import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './BookingPage.css';
import { UserContext } from '../Context/userContext';

function BookingPage() {
  const userContext = useContext(UserContext); 
  const [confirmedBookings, setConfirmedBookings] = useState([]);

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

            setConfirmedBookings(response.data);
        } catch (error) {
            console.error("Error fetching confirmed bookings:", error);
        }
    };

    fetchBookings();
}, [userContext.user?._id, userContext.user?.role]);  // Dependency array adjusted

  if (!userContext.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {confirmedBookings
        .filter(booking => booking.status === 'Approved')
        .map((booking) => (
            <div className="pet-pal-request-box-card" key={booking._id}>
                <h2>Confirmed Bookings</h2>
                <h3>Booking For: {booking.userName}</h3>

                <div className="pet-pal-request-container-card">
                    <h5>For Pets:</h5>
                    <p>{booking.petNames.join(', ')}</p>
                </div>

                {booking.carerName && (
                    <div className="pet-pal-request-container-card">
                        <h2>Carer Name: {booking.carerName}</h2>
                    </div>
                )}

                <div className="pet-pal-request-container-card">
                    <h2>User Name: {booking.userName}</h2>
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

                {booking.contactNumber && (
                    <div className="pet-pal-request-container-card">
                        <h5>Contact Number:</h5>
                        <p>{booking.contactNumber}</p>
                    </div>
                )}

            </div>
        ))}
    </div>
  );
}

export default BookingPage;
