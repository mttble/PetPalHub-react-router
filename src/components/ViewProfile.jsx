import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProfile.css'


const ViewProfile = () => {

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.email) {
          const response = await axios.get('/carer/profile', {
            params: {
              userId: userData._id
            }
          });
          if (response.status === 200) {
            setProfileData(response.data);
          } else {
            console.error('Failed to fetch profile data:', response.data);
          }
        } else {
          console.error('User email not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchProfileData();
  }, []);

  return (
    <div className="create-profile-box">
      <h1 className="mt-4 profile-title">View Profile</h1>
      {profileData ? (
        <div>
          <div>
            <h2>{profileData.companyFullName}</h2>
          </div>
          <div className="profile-box">
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

          <h2 className="profile-heading">About Me:</h2>
          <p>{profileData.aboutMe}</p>

          <h2 className="profile-heading">Experience:</h2>
          <p>{profileData.experience}</p>

          <h2 className="profile-heading">Pet Types:</h2>
          <ul>
            {profileData.petType.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>

          <h2 className="profile-heading">Additional Services:</h2>
          <ul>
            {profileData.additionalServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default ViewProfile;
