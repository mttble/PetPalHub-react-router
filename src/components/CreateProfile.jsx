
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import axios from 'axios';
import './CreateProfile.css'

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />



const CreateProfile = () => {
  const userContext = useContext(UserContext)
  const [avatar, setAvatar] = useState(null)
  
  const [profile, setProfile] = useState({
    companyFullName:'',
    petType: [],
    additionalServices: [],
    aboutMe: '',
    experience: '',
    location: '',
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
      const formData = new FormData();

      // Append each profile key-value to the formData
      for (const key in profile) {
          if (Array.isArray(profile[key])) {
              profile[key].forEach(item => {
                  formData.append(key, item);
              });
          } else {
              formData.append(key, profile[key]);
          }
      }

      // Append the avatar image if available
      if (avatar) {
          formData.append('avatar', avatar);
      }

      // adding the users id as well to the create profile for retrieval purposes
      const userData = JSON.parse(localStorage.getItem('userData')); // Get user data from local storage
      if (userData && userData._id) {
        formData.append('userId', userData._id); // Include user's ID in the form data
      }
      if (userData && userData.email) {
        formData.append('carerEmail', userData.email); // Include user's email in the form data
      }
      
      const response = await axios.post('/carer/profile', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });


      if (response.status === 201) {
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
    'Flexible drop-off/pick-up',
  ];

  const petType = [
    'Dogs',
    'Cats',
  ]

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
    }
  };
  

  if (userContext.user) {
    if (userContext.user.role === 'carer') {
      return (
        <>
          <div className="create-profile-card-title">
            <h1>Create Profile</h1>
          </div>
          <div className="create-profile-card-box">
            
          <div className="profile-card-avatar">
              {avatar ? (
                <img src={URL.createObjectURL(avatar)} alt="Profile Avatar" className="avatar-card-preview" />
              ) : (
                <div className="placeholder-card-avatar">
                  <h3>Profile Picture</h3>
                </div>
              )}
            </div>

            <div className="upload-card-avatar">
              <input
                type="file"
                accept="image/*"
                id="avatarUpload"
                style={{ display: 'none' }}
                onChange={handleAvatarUpload}
              />
              <label htmlFor="avatarUpload" className="upload-avatar-card-label btn btn-secondary">Upload Picture</label>
            </div>
            <div className="create-profile-card-heading">
              <h4>Company or Full Name</h4>
            </div>
            <div className="create-profile-card-text-container">
              <input
                className="create-profile-card-text-input"
                type="text"
                name="companyFullName"
                value={profile.companyFullName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="categories-container">

            <div className="pet-types">
              <div className="create-profile-card-heading">
                <h4>Pet Types</h4>
              </div>
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

            <div className="additional-services">
              <div className="create-profile-card-heading">
                <h4>Additional Services</h4>
              </div>
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

            </div>

            <div className="about-section">
        <div className="create-profile-card-heading">
          <h4>About Me</h4>
        </div>
        <div className="create-profile-card-textarea-container">
          <textarea
            className="create-profile-card-textarea"
            name="aboutMe"
            value={profile.aboutMe}
            onChange={handleInputChange}
          />
        </div>

        <div className="create-profile-card-heading">
          <h4>Experience</h4>
        </div>
        <div className="create-profile-card-textarea-container">
          <textarea
            className="create-profile-card-textarea"
            name="experience"
            value={profile.experience}
            onChange={handleInputChange}
          />
        </div>

        <div className="create-profile-card-heading">
          <h4>Location (used by users to search):</h4>
        </div>
        <div className="create-profile-card-textarea-container">
          <textarea
            className="create-profile-card-textarea"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
          />
        </div>         
      </div>

      <div className="create-profile-card-submit-button">
        <button variant="primary" className="size-sm-lg btn btn-primary" onClick={handleCreateProfile}>Create/Update Profile</button>
      </div>
      
    </div>
  </>
);
    } else {
      return <h1>Hello</h1>;
    }
  }
}

export default CreateProfile;
