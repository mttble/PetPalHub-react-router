import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

function BookingForm() {
  const navigate = useNavigate();

  const [bookingInfo, setBookingInfo] = useState({
    startDate: '',
    endDate: '',
    dropOffTime: '',
    pickUpTime: '',
    selectedPets: [],
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      bookingInfo.selectedPets.length === 0 ||
      !bookingInfo.endDate ||
      !bookingInfo.pickUpTime ||
      !bookingInfo.dropOffTime ||
      bookingInfo.message.length < 15
    ) {
      // Show error messages
      if (bookingInfo.selectedPets.length === 0) {
        alert('Please select at least one pet.');
      }
      if (!bookingInfo.endDate) {
        alert('Please select an end date.');
      }
      if (!bookingInfo.pickUpTime) {
        alert('Please select a pick-up time.');
      }
      if (!bookingInfo.dropOffTime) {
        alert('Please select a drop-off time.');
      }
      if (bookingInfo.message.length < 15) {
        alert('Please provide a message with a minimum of 15 characters.');
      }
      return;
    }
    // Submit the booking information
    console.log('Booking submitted:', bookingInfo);
    // Redirect to Account page
    navigate('/account');
  };

  return (
    <div className="booking-form-box-card">
      <div className="booking-form-title-card">
        <h2>PetPal Request</h2>
      </div>
      <div className="booking-form-subtitle-card">
        <h5>Booking For: </h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="booking-form-container-card">
          <h5>Select Pets: </h5>
          {/* Call to pet logic goes here */}
        </div>
        <div className="booking-form-container-card">
          <h5>Select Dates:</h5>
          <label>Start Date:</label>
          <input
            type="date"
            value={bookingInfo.startDate}
            onChange={(e) => setBookingInfo({ ...bookingInfo, startDate: e.target.value })}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={bookingInfo.endDate}
            onChange={(e) => setBookingInfo({ ...bookingInfo, endDate: e.target.value })}
          />
        </div>
        <div className="booking-form-container-card">
          <h5>Select Time:</h5>
          <label>Pick-up time:</label>
          <input
            type="time"
            value={bookingInfo.pickUpTime}
            onChange={(e) => setBookingInfo({ ...bookingInfo, pickUpTime: e.target.value })}
          />
          <label>Drop-off time:</label>
          <input
            type="time"
            value={bookingInfo.dropOffTime}
            onChange={(e) => setBookingInfo({ ...bookingInfo, dropOffTime: e.target.value })}
          />
        </div>
        <div className="booking-form-container-card">
          <h6>Message/Care Instructions:</h6>
          <textarea
            value={bookingInfo.message}
            onChange={(e) => setBookingInfo({ ...bookingInfo, message: e.target.value })}
          />
        </div>
        <div className="booking-form-button-container-card">
          <button type="submit" className="booking-form-button-card">Submit</button>
          <button type="button" className="booking-form-button-card" onClick={() => navigate('/account')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
