import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProfile = ({ onCreateProfile }) => {
  const [profile, setProfile] = useState({
    aboutMe: '',
    experience: '',
    additionalServices: [],
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

  const handleCreateProfile = () => {
    onCreateProfile(profile);
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
      <h3>Create Profile</h3>
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
                checked={profile.additionalServices.includes(service)}
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
          value={profile.aboutMe}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h4>Experience</h4>
        <textarea
          name="experience"
          value={profile.experience}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleCreateProfile}>Create Profile</button>
    </div>
  );
};

export default CreateProfile;
