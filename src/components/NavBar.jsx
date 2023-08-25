import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/userContext.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'


function NavBar() {
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    userContext.logout(); // Call the logout function from context
  }
  
  if (userContext.user) {
    if (userContext.user.role === 'user') {
      return (
        <div className="navbar">
          <Link to="/" className="navbar-brand-container">
            <div className="navbar-brand">PetPal Hub</div>
          </Link>
          <div className="navbar-buttons">
            <Link to="/account"> {/* Use /account route for user's account */}
              <Button variant="primary" className="size-sm-lg">
                Account User
              </Button>
            </Link>
            <Button variant="primary" className="size-sm-lg" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      );
    } else if (userContext.user.role === 'carer') {
      return (
        <div className="navbar">
          <Link to="/" className="navbar-brand-container">
            <div className="navbar-brand">PetPal Hub</div>
          </Link>
          <div className="navbar-buttons">
            <Link to="/account"> {/* Use /account route for carer's account */}
              <Button variant="primary" className="size-sm-lg">
                Account Carer
              </Button>
            </Link>
            <Button variant="primary" className="size-sm-lg" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      );
    }
  }

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

export default NavBar;