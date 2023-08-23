import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ViewProfile = ({ userProfile }) => {
  const { aboutMe, experience, additionalServices } = userProfile;
  const navigate = useNavigate();

  return (
    <div>
      <h2>View Profile</h2>
      <div>
        <h3>About Me:</h3>
        <p>{aboutMe}</p>
      </div>
      <div>
        <h3>Experience:</h3>
        <p>{experience}</p>
      </div>
      <div>
        <h3>Additional Services:</h3>
        <ul>
          {additionalServices.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
      <Link to="/edit-profile">Edit Profile</Link>
      {/* Add button for deleting profile not priority */}
    </div>
  );
};

export default ViewProfile;
