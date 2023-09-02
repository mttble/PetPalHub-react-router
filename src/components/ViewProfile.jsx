import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylesheets/ViewProfile.css'


const ViewProfile = () => {

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData._id) {
          const response = await axios.get('https://petpalhub-api.onrender.com/carer/profile', {
            params: {
              userId: userData._id
            }
          });
          if (response.status === 200) {
            setProfileData(response.data);
          } else {
            console.log('No profile data to display', response.data);
          }
        } else {
          console.error('User not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchProfileData();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.delete('https://petpalhub-api.onrender.com/carer/profile', {
        params: {
          userId: userData._id
        }
      });

      if (response.status === 200) {
        console.log('Profile deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete profile:', response.data);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <>
      <h1 className="mt-4 profile-title profile-card">View Profile</h1>
      <div className="create-profile-box">
        {profileData ? (
          <div className="profile-content">
            <div className="profile-header">
              <div className="company-name-card">
                <h2 className="company-name-text">{profileData.companyFullName}</h2>
              </div>
              <div className="profile-image-card">
                {profileData.profileImage ? (
                  <img
                    src={`http://localhost:5505${profileData.profileImage}`}
                    alt="Profile"
                    className="avatar-preview1"
                  />
                ) : (
                  <div className="placeholder-avatar">
                    <h3>No Profile Picture</h3>
                  </div>
                )}
                </div>
              </div>

              <div className="location-card">
                <h2 className="profile-heading">Location:</h2>
                <p className="location-text">{profileData.location}</p>
              </div>

              <div className="about-card">
                <h2 className="profile-heading">About Me:</h2>
                <p className="about-text">{profileData.aboutMe}</p>
              </div>

              <div className="experience-card">
                <h2 className="profile-heading">Experience:</h2>
                <p className="experience-text">{profileData.experience}</p>
              </div>

              <div className="pet-type-card">
                <h2 className="profile-heading">Pet Types:</h2>
                <ul className="pet-type-list">
                  {profileData.petType.map((type, index) => (
                    <li key={index} className="pet-type-item">{type}</li>
                  ))}
                </ul>
              </div>

              <div className="services-card">
                <h2 className="profile-heading">Additional Services:</h2>
                <ul className="services-list">
                  {profileData.additionalServices.map((service, index) => (
                    <li key={index} className="service-item">{service}</li>
                  ))}
                </ul>
              </div>

              <button className="delete-profile-btn size-sm-lg btn btn-danger" onClick={handleDeleteProfile}>
                Delete Profile
              </button>
          </div>
        ) : (
          <p className="no-profile-text">No profile data to display.</p>
        )}
        </div>
    </>
);

};

export default ViewProfile;
