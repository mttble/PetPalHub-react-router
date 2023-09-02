import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import './stylesheets/BookingForm.css';



function BookingForm() {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const location = useLocation()
  const selectedProfile = location.state?.selectedProfile

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

  const handlePetChange = (e, petId) => {
    if (e.target.checked) {
        setBookingInfo(prevState => ({
            ...prevState,
            selectedPets: [...prevState.selectedPets, petId]
        }));
    } else {
        setBookingInfo(prevState => ({
            ...prevState,
            selectedPets: prevState.selectedPets.filter(id => id !== petId)
        }));
    }
  };

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
    
    const userfirstName = userContext.user.firstName
    const userEmail = userContext.user.email
    
    const data = {
        startDate: startDate,
        endDate: endDate,
        pickUpTime: pickUpTime,
        dropOffTime: dropOffTime,
        petIds: bookingInfo.selectedPets,
        petNames: selectedPetNames,
        carerId: selectedProfile.userId,
        carerName: selectedProfile.companyFullName,
        carerEmail: selectedProfile.carerEmail,
        message: bookingInfo.message,
        userName: userfirstName,
        userEmail: userEmail
    }

    
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
      toast.success('Request sent successfully')
      navigate('/');
    } else {
      toast.error('There was a problem with the request')
    }
  };

  return (
    <>
      <div className="heading">
          <h2>PetPal Request</h2>
      </div>
      <div className="booking-form-box-card">
        <h3 className="booking-form-subtitle-card">
          Requested <strong>{selectedProfile.companyFullName}</strong>
        </h3>
        {petProfile === null ? (
          <p>Try Logging in and adding a pet!</p>
        ) : (
        <form onSubmit={handleSubmit}>
            <div className="booking-form-container-card">
                <h5 style={{textAlign: 'left'}}>Select Pets:</h5>
                {petProfile.map(pet => (
                    <div key={pet._id} className="pet-item">
                        <label htmlFor={pet._id}>
                            {pet.petName}
                            <input type="checkbox" id={pet._id} value={pet._id} checked={bookingInfo.selectedPets.includes(pet._id)} onChange={(e) => handlePetChange(e, pet._id)} />
                        </label>
                    </div>
                ))}
            </div>
            <div className="booking-form-container-card">
                <h5 style={{textAlign: 'left'}}>Select Dates:</h5>
                <div className="inline-input">
                    <label htmlFor="startDate">Start Date:</label>
                    <input id="startDate" type="date" value={bookingInfo.startDate} onChange={(e) => setBookingInfo({ ...bookingInfo, startDate: e.target.value })} />
                </div>
                <div className="inline-input">
                    <label htmlFor="endDate">End Date:</label>
                    <input id="endDate" type="date" value={bookingInfo.endDate} onChange={(e) => setBookingInfo({ ...bookingInfo, endDate: e.target.value })} />
                </div>
            </div>
            <div className="booking-form-container-card">
                <h5 style={{textAlign: 'left'}}>Select Time:</h5>
                <div className="inline-input">
                    <label htmlFor="dropOffTime">Drop-off time:</label>
                    <input id="dropOffTime" type="time" value={bookingInfo.dropOffTime} onChange={(e) => setBookingInfo({ ...bookingInfo, dropOffTime: e.target.value })} />
                </div>
                <div className="inline-input">
                    <label htmlFor="pickUpTime">Pick-up time:</label>
                    <input id="pickUpTime" type="time" value={bookingInfo.pickUpTime} onChange={(e) => setBookingInfo({ ...bookingInfo, pickUpTime: e.target.value })} />
                </div>
            </div>
            <div className="booking-form-textarea-container-card">
                <label>Message/Care Instructions: </label>
                <textarea value={bookingInfo.message} onChange={(e) => setBookingInfo({ ...bookingInfo, message: e.target.value })} />
            </div>
            <div className="booking-form-button-container-card">
                <button type="submit" className="booking-form-button-card">Submit</button>
                <button type="reset" className="booking-form-button-card">Reset</button>
            </div>
        </form>
        )}
      </div>
    </>
  );
}

export default BookingForm;
