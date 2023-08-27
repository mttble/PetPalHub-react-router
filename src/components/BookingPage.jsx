import React from 'react';
import './BookingPage.css'; // Make sure to import the correct CSS file

function BookingPage() {
  return (
    <div className="booking-form-box-card"> {/* Use the same class for styling */}
      <h2>Booking Confirmation</h2>
      <div className="booking-form-container-card"> {/* Use the same class for styling */}
        <h4>Booking Information:</h4>
        <p>Start Date: August 15, 2023</p>
        <p>End Date: August 20, 2023</p>
        <p>Pick-up Time: 10:00 AM</p>
        <p>Drop-off Time: 3:00 PM</p>
        <p>Selected Pets: Dog, Cat</p>
        <p>Message: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
}

export default BookingPage;
