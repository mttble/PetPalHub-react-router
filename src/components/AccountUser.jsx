import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import CreateProfile from './CreateProfile';
import ViewProfile from './ViewProfile';
import './NavBar.css';
import './AccountUser.css';

function AccountUser() {
  const [hasProfile, setHasProfile] = useState(false); // Change to false initially
  const [userProfile, setUserProfile] = useState(null); // Store the user's profile data

  const handleCreateProfile = (profileData) => {
    setUserProfile(profileData);
    setHasProfile(true); // Mark that the user has a profile
  };

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
          <Routes>
            <Route
              path="/create-profile"
              element={<CreateProfile onCreateProfile={handleCreateProfile} />}
            />
            <Route path="/view-profile" element={<ViewProfile userProfile={userProfile} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AccountUser;
