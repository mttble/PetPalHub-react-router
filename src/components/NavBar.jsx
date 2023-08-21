import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'



// const handleLogin = () => {
//   // Logic to open login modal or redirect to login page
// };

// const handleSignUp = () => {
//   // Logic to open signup modal or redirect to signup page
// };

function ResponsiveNavbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand-container">
        <div className="navbar-brand">PetPal Hub</div>
      </Link>
      <div className="navbar-buttons">
        <Link to="/login">
          <Button variant="primary" className="size-sm-lg">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" className="size-sm-lg">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ResponsiveNavbar