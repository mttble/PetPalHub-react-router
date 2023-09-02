import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/userContext.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/NavBar.css'


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
            <Link to="/account">
              <Button variant="primary" className="size-sm-lg-nav">
                Account User
              </Button>
            </Link>
            <Button variant="primary" className="size-sm-lg-nav" onClick={handleLogout}>
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
            <Link to="/account">
              <Button variant="primary" className="size-sm-lg-nav">
                Account Carer
              </Button>
            </Link>
            <Button variant="primary" className="size-sm-lg-nav" onClick={handleLogout}>
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
          <Button variant="primary" className="size-sm-lg-nav">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" className="size-sm-lg-nav">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar;