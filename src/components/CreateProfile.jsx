import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateProfile = ({ onCreateProfile }) => {
  const [profile, setProfile] = useState({
    aboutMe: '',
    experience: '',
    additionalServices: [],
  });

  const history = useHistory();

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
    history.push('/view-profile');
  };

  return (
    <div>
      <input
        type="text"
        name="aboutMe"
        value={profile.aboutMe}
        onChange={handleInputChange}
      />
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
      <button onClick={handleCreateProfile}>Create Profile</button>
    </div>
  );
};

export default CreateProfile;
