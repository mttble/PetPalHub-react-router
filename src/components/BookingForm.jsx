import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import { toast } from 'react-hot-toast';



function BookingForm() {
  const userContext = useContext(UserContext);


  const location = useLocation();
  const selectedProfile = location.state?.selectedProfile;



  const navigate = useNavigate();

  const [bookingInfo, setBookingInfo] = useState({
    startDate: '',
    endDate: '',
    dropOffTime: '',
    pickUpTime: '',
    selectedPets: '',
    message: '',
  });


  const [petProfile, setPetProfile] = useState(null)

  useEffect(() => {
      const fetchPetProfile = async () => {
          try {
              if (userContext.user && userContext.user._id) {
                  const pets = await axios.get('/pet/pet-profiles', {
                      params: {
                          userId: userContext.user._id, // Use user ID from context
                      },
                  });
                  if (pets.status === 200) {
                      setPetProfile(pets.data);
                  } else {
                      console.error('Failed to fetch pet profile data:', pets.data);
                  }
              }
          } catch (error) {
              console.error('Error fetching pet profile data:', error);
          }
      };

      fetchPetProfile();
  }, [userContext.user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    function extractDateStringAndTime(date, time) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = parseInt(time.split(':')[0]);
      const minute = parseInt(time.split(':')[1]);
  
      const combinedDate = new Date(year, month, day, hour, minute);
  
      // Extract date and time as strings
      const dateString = combinedDate.toISOString().split('T')[0];
      const timeString = combinedDate.toTimeString().split(' ')[0].slice(0, 5); // to get HH:MM format
  
      return { dateString, timeString };
  }
    const { dateString: startDate, timeString: pickUpTime } =
      extractDateStringAndTime(new Date(bookingInfo.startDate), bookingInfo.pickUpTime);

    const { dateString: endDate, timeString: dropOffTime } =
      extractDateStringAndTime(new Date(bookingInfo.endDate), bookingInfo.dropOffTime);


    const selectedPetNames = bookingInfo.selectedPets.map(petId => {
      const pet = petProfile.find(p => p._id === petId);
        return pet ? pet.petName : null;
    }).filter(Boolean);  // This filter will remove any null values
    
    console.log(userContext.user);
    const userfirstName = userContext.user.firstName
    
    const data = {
        startDate: startDate,
        endDate: endDate,
        pickUpTime: pickUpTime,
        dropOffTime: dropOffTime,
        petIds: bookingInfo.selectedPets,
        petNames: selectedPetNames,
        carerId: selectedProfile.userId,
        carerName: selectedProfile.companyFullName,
        message: bookingInfo.message,
        userName: userfirstName
    };
    
    const postBooking = async (data) => {
      try {
          const response = await axios.post('/user/booking', data, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });
          return response.data;
      } catch (error) {
          console.error("There was a problem with the Axios request:", error.message);
      }
    };
    
    const response = await postBooking(data);
    if (response) {
      // You might want to handle the response here. For instance:
      // Check if the booking was successful and navigate or show a message.
      toast.success('Request sent successfully')
      navigate('/');
    } else {
      // Handle errors, perhaps set an error state or show a notification
    }
  };

  return (
    <div className="booking-form-box-card">
      <h2>PetPal Request</h2>
      <h3>Requested Carer: {selectedProfile.companyFullName}</h3>
      {petProfile === null ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
        <div className="booking-form-container-card">
          <h5>Select Pets:</h5>
          {petProfile.map(pet => (
              <div key={pet._id}>
                  <input 
                      type="checkbox" 
                      id={pet._id}
                      value={pet._id}
                      checked={bookingInfo.selectedPets.includes(pet._id)}
                      onChange={(e) => {
                          if (e.target.checked) {
                              setBookingInfo(prevState => ({
                                  ...prevState,
                                  selectedPets: [...prevState.selectedPets, e.target.value]
                              }));
                          } else {
                              setBookingInfo(prevState => ({
                                  ...prevState,
                                  selectedPets: prevState.selectedPets.filter(id => id !== e.target.value)
                              }));
                          }
                      }}
                  />
                  <label htmlFor={pet._id}>{pet.petName}</label>
              </div>
          ))}
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
      )}
    </div>
  );
}

export default BookingForm;
