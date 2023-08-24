import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'


function NavBar() {
  

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

export default NavBar