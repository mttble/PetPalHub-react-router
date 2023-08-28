import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import './Account.css';
import { UserContext } from '../Context/userContext';

function Account() {
  
  const userContext = useContext(UserContext);


  if (userContext.user) {
    if (userContext.user.role === 'user') {
        return (
          <div className="centered-container-account">
            <div className="account-container">
              <h2>Dashboard Overview</h2>
              <div className="account-buttons">
                <div className="other-buttons-section">
                  <Link to="/booking-page">
                    <Button variant="primary" className="account-button" >
                      Bookings
                    </Button>
                  </Link>
                  <Link to="/petpal-requests">
                    <Button variant="primary" className="account-button">
                      PetPal Requests
                    </Button>
                  </Link>
                  <Link to="/create-pet">
                    <Button variant="primary" className="account-button">
                      Add Pet
                    </Button>
                  </Link>
                </div>
                <div className="view-profile-button-section">
                  <Link to="/view-pets">
                    <Button variant="primary" className="account-button">
                      View Pets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
            
        );
    } else if (userContext.user.role === 'carer') {
        return (
          <div className="centered-container-account">
            <div className="account-container">
              <h2>Dashboard Overview</h2>
              <div className="account-buttons">
                <div className="other-buttons-section">
                  <Link to="/bookings">
                    <Button variant="primary" className="account-button" >
                      Bookings
                    </Button>
                  </Link>
                  <Link to="/petpal-requests">
                    <Button variant="primary" className="account-button">
                      PetPal Requests
                    </Button>
                  </Link>
                  <Link to="/create-profile">
                    <Button variant="primary" className="account-button">
                      Create Profile
                    </Button>
                  </Link>
                </div>
                <div className="view-profile-button-section">
                  <Link to="/view-profile">
                    <Button variant="primary" className="account-button">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className='dashboard-welcome'>Page not displayed</div>
  )
};


export default Account;
