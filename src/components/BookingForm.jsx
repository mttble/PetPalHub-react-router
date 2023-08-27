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
    // Do nothing for now
  };

  return (
    <div className="booking-form-box-card">
      <h2>PetPal Request</h2>
      <h3>Booking For: </h3>
      <form onSubmit={handleSubmit}>
        <div className="booking-form-container-card">
          <h5>Select Pets:</h5>
          {/* Call to pet logic goes here */}
        </div>
        <div className="booking-form-container-card">
          <h5>Select Dates:</h5>
          <label>Start Date:</label>
          <input
            type="date"
            value={bookingInfo.startDate}
            onChange={(e) =>
              setBookingInfo({ ...bookingInfo, startDate: e.target.value })
            }
          />
          <label>End Date:</label>
          <input
            type="date"
            value={bookingInfo.endDate}
            onChange={(e) =>
              setBookingInfo({ ...bookingInfo, endDate: e.target.value })
            }
          />
        </div>
        <div className="booking-form-container-card">
          <h5>Select Time:</h5>
          <label>Pick-up time:</label>
          <input
            type="time"
            value={bookingInfo.pickUpTime}
            onChange={(e) =>
              setBookingInfo({ ...bookingInfo, pickUpTime: e.target.value })
            }
          />
          <label>Drop-off time:</label>
          <input
            type="time"
            value={bookingInfo.dropOffTime}
            onChange={(e) =>
              setBookingInfo({ ...bookingInfo, dropOffTime: e.target.value })
            }
          />
        </div>
        <div className="booking-form-textarea-container-card">
          <label>Message/Care Instructions: </label>
          <textarea
            value={bookingInfo.message}
            onChange={(e) =>
              setBookingInfo({ ...bookingInfo, message: e.target.value })
            }
          />
        </div>
        <div className="booking-form-button-container-card">
          <button type="submit" className="booking-form-button-card">
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate('/account')}
            className="booking-form-button-card"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
