import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './NavBar.css';
import './PetSitterAccount.css';

function PetSitterAccount() {
  const hasProfile = true;
  
  return (
    <div>
      <NavBar />
      <div className="centered-container">
        <div className="account-container">
          <h2>Dashboard Overview</h2>
          <div className="account-buttons">
            <Link to="/bookings">
              <Button variant="primary" className="size-sm-lg">
                Bookings
              </Button>
            </Link>
            <Link to="/petpal-requests">
              <Button variant="primary" className="size-sm-lg">
                PetPal Requests
              </Button>
            </Link>
            {hasProfile ? (
              <Link to="/view-profile">
                <Button variant="primary" className="size-sm-lg">
                  View Profile
                </Button>
              </Link>
            ) : (
              <Link to="/create-profile">
                <Button variant="primary" className="size-sm-lg">
                  Create Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetSitterAccount;