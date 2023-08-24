import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import CreateProfile from './CreateProfile';
import ViewProfile from './ViewProfile';
import './AccountCarer.css';

function AccountCarer() {
  const hasProfile = true;
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/create-profile');
  };

  return (
    <div>
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
              <Button
                variant="primary"
                className="size-sm-lg"
                onClick={handleCreateProfile}
              >
                Create Profile
              </Button>
            )}
          </div>
          <Routes>
            <Route
              path="/create-profile"
              element={<CreateProfile onCreateProfile={handleCreateProfile} />}
            />
            <Route path="/view-profile" element={<ViewProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AccountCarer;
