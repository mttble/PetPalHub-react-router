import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfile.css';
import { UserContext } from '../Context/userContext';
import axios from 'axios'

const CreateProfile = ({ onCreateProfile }) => {
  const userContext = useContext(UserContext)
  
  const [profile, setProfile] = useState({
    aboutMe: '',
    experience: '',
    additionalServices: [],
    petType: [],
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        additionalServices: [...prevProfile.additionalServices, name],
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        additionalServices: prevProfile.additionalServices.filter(
          (service) => service !== name
        ),
      }));
    }
  };

  const handleCheckboxChangePetType = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        petType: [...prevProfile.petType, name], // Corrected property name
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        petType: prevProfile.petType.filter((type) => type !== name), // Corrected property name
      }));
    }
  };
  
  
  
  const handleCreateProfile = async () => {
    try {
      // Make a POST request to the backend with the profile data
      const response = await axios.post('http://localhost:5505/carer/profile', profile);
  
      if (response.status === 201) {
        console.log(response.data.message);
        navigate('/view-profile');
      } else {
        console.error('Failed to create profile:', response.data);
      }
    } catch (error) {
      console.error('Error creating profile:', error, error.response.data);
    }
  
  }

  const additionalServicesOptions = [
    'Pet Photography',
    'Pet Transportation',
    'Grooming',
    'Dog walks',
    'Daily updates',
    'Flexible drop-off/pick-up',
  ];

  const petType = [
    'Dogs',
    'Cats',
  ]
  if (userContext.user) {
    if (userContext.user.role === 'carer') {
      return (
        <div className="create-profile-box">
          <div className="create-profile-title">
            <h1>Create Profile</h1>
          </div>
          <div className="create-profile-heading">
            <h4>Pet Types</h4>
          </div>
          <div>
            {petType.map((type) => (
            <div key={type}>
              <label>
                <input
                  type="checkbox"
                  name={type}
                  checked={profile.petType.includes(type)}
                  onChange={handleCheckboxChangePetType}
                />
                {type}
              </label>
            </div>
            ))}
          </div>
          <div className="create-profile-heading">
            <h4>Additional Services</h4>
          </div>
          <div>
            {additionalServicesOptions.map((service) => (
              <div key={service}>
                <label>
                  <input
                    type="checkbox"
                    name={service}
                    checked={profile.additionalServices.includes(service)}
                    onChange={handleCheckboxChange}
                  />
                  {service}
                </label>
              </div>
            ))}
          </div>
          <div className="create-profile-heading">
            <h4>About Me</h4>
          </div>
          <div className='create-profile-textarea-container'>
            <textarea
              className="create-profile-textarea"
              name="aboutMe"
              value={profile.aboutMe}
              onChange={handleInputChange}
            />
          </div>
          <div className="create-profile-heading">
            <h4>Experience</h4>
          </div>
          <div className='create-profile-textarea-container'>
            <textarea
              className="create-profile-textarea"
              name="experience"
              value={profile.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="create-profile-submit-button">
            <button variant="primary" className="size-sm-lg btn btn-primary" onClick={handleCreateProfile}>Create Profile</button>
          </div>
        </div>
      );
    }
    else return (
      <h1>hello</h1>
    )
  }
}

export default CreateProfile;
