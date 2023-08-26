import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handlePetSelection = (petId) => {
    if (bookingInfo.selectedPets.includes(petId)) {
      setBookingInfo((prevState) => ({
        ...prevState,
        selectedPets: prevState.selectedPets.filter((pet) => pet !== petId),
      }));
    } else {
      setBookingInfo((prevState) => ({
        ...prevState,
        selectedPets: [...prevState.selectedPets, petId],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      bookingInfo.selectedPets.length === 0 ||
      !bookingInfo.endDate ||
      bookingInfo.message.length < 15
    ) {
      // Show error messages
      if (bookingInfo.selectedPets.length === 0) {
        alert('Please select at least one pet.');
      }
      if (!bookingInfo.endDate) {
        alert('Please select an end date.');
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
    <div>
      <h2>PetPal Request</h2>
      <h3>Booking For: Carer</h3>
      <form onSubmit={handleSubmit}>
        {/* ... */}
        <h4>Select Pets:</h4>
        {/* Assume petsData is an array of pet objects */}
        {petsData.map((pet) => (
          <label key={pet.id}>
            <input
              type="checkbox"
              value={pet.id}
              checked={bookingInfo.selectedPets.includes(pet.id)}
              onChange={() => handlePetSelection(pet.id)}
            />
            {pet.name}
          </label>
        ))}
        {/* ... */}
        <h4>Select Dates:</h4>
        <label>Start Date:
          <input
            type="date"
            value={bookingInfo.startDate}
            onChange={(e) => setBookingInfo({ ...bookingInfo, startDate: e.target.value })}
          />
        </label>
        <label>End Date:
          <input
            type="date"
            value={bookingInfo.endDate}
            onChange={(e) => setBookingInfo({ ...bookingInfo, endDate: e.target.value })}
          />
        </label>
        {/* ... */}
        <label>Message:</label>
        <textarea
          value={bookingInfo.message}
          onChange={(e) => setBookingInfo({ ...bookingInfo, message: e.target.value })}
        />
        {/* ... */}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate('/account')}>Cancel</button>
        {/* ... */}
      </form>
    </div>
  );
}

export default BookingForm;