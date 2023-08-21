import React from 'react';
import './NavBar.css'
import Button from 'react-bootstrap/Button';


const handleLogin = () => {
  // Logic to open login modal or redirect to login page
};

const handleSignUp = () => {
  // Logic to open signup modal or redirect to signup page
};

function ResponsiveNavbar() {
  return (
    <div className="navbar">
      <div className="navbar-brand-container">
        <div className="navbar-brand">PetPalHub</div>
      </div>
      <div className="navbar-buttons">
        <Button variant="primary" className="size-sm-lg" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="primary" className="size-sm-lg" onClick={handleSignUp}>
          Signup
        </Button>
      </div>
    </div>
  );
}

export default ResponsiveNavbar;