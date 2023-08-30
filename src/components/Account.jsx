import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './Account.css';
import { UserContext } from '../Context/userContext';

function Account() {
  const userContext = useContext(UserContext);

  if (userContext.user) {
    return (
      <div className="centered-container-account-card">
        <div className="dashboard-overview">
          <h2>Dashboard Overview</h2>
        </div>
        <div className="account-container-card">
          <div className="account-buttons-card">
            <div className="other-buttons-section-card">
              <Link to="/booking-page">
                <Button variant="primary" className="account-button-card custom-button" >
                  Bookings
                </Button>
              </Link>
              <Link to="/petpal-requests">
                <Button variant="primary" className="account-button-card custom-button">
                  {userContext.user.role === 'user' ? 'PetPal Requests' : 'PetPal Requests'}
                </Button>
              </Link>
              <Link to={userContext.user.role === 'user' ? "/create-pet" : "/create-profile"}>
                <Button variant="primary" className="account-button-card custom-button">
                  {userContext.user.role === 'user' ? 'Add Pet' : 'Create Profile'}
                </Button>
              </Link>
            </div>
            <div className="view-profile-button-section-card">
              <Link to={userContext.user.role === 'user' ? "/view-pets" : "/view-profile"}>
                <Button variant="primary" className="account-button-card custom-button">
                  {userContext.user.role === 'user' ? 'View Pets' : 'View Profile'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard-welcome'>Page not displayed</div>
  );
}

export default Account;
