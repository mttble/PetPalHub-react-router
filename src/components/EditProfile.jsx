import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ userProfile, onUpdateProfile }) => {
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setEditedProfile((prevProfile) => ({
        ...prevProfile,
        additionalServices: [...prevProfile.additionalServices, name],
      }));
    } else {
      setEditedProfile((prevProfile) => ({
        ...prevProfile,
        additionalServices: prevProfile.additionalServices.filter(
          (service) => service !== name
        ),
      }));
    }
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editedProfile);
    navigate('/view-profile');
  };

  const additionalServicesOptions = [
    'Pet Photography',
    'Pet Transport',
    'Grooming',
    // Add other additional services here
  ];

  return (
    <div>
      <h3>Edit Profile</h3>
      <div>
        <h4>Categories</h4>
        {/* ... (categories checkboxes) */}
      </div>
      <div>
        <h4>Additional Services</h4>
        {additionalServicesOptions.map((service) => (
          <div key={service}>
            <label>
              <input
                type="checkbox"
                name={service}
                checked={editedProfile.additionalServices.includes(service)}
                onChange={handleCheckboxChange}
              />
              {service}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h4>About Me</h4>
        <textarea
          name="aboutMe"
          value={editedProfile.aboutMe}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h4>Experience</h4>
        <textarea
          name="experience"
          value={editedProfile.experience}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSaveProfile}>Save Profile</button>
    </div>
  );
};

export default EditProfile;
