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
                src={`https://petpalhub-api.onrender.com${profileData.profileImage}`}
                alt="Profile"
                className="avatar-preview1"
              />
            ) : (
              <div className="placeholder-avatar">
                <h3>No Profile Picture</h3>
              </div>
            )}
          </div>

          <h2 className="profile-heading">Location:</h2>
          <p>{profileData.location}</p>

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
          <button className="size-sm-lg btn btn-danger" onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      ) : (
        <p>No profile data to display.</p>
      )}
    </div>
  );
};

export default ViewProfile;
