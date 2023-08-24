import React from 'react'
import { Link } from 'react-router-dom'
import './SignupPrompt.css'

function SignupPrompt() {
  // Logic for signup page
  return (
    <>
      <div className="centered-container-signup">
        <h1>Signup As a User or Carer</h1>
      </div>
      <div className="signup-prompt">
        <Link to="/signup-user" className="signup-user">
          <div className="user">User</div>
        </Link>
        <Link to="/signup-carer" className="signup-carer">
          <div className="carer">Carer</div>
        </Link>
      </div>
    </>
  );
}

export default SignupPrompt;