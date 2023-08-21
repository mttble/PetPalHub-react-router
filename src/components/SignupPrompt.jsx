import React from 'react'
import { Link } from 'react-router-dom'
import './SignupPrompt.css'

function SignupPrompt() {
  // Logic for signup page
  return (
    <>
      <div className="centered-container">
        <h1>Signup Prompt</h1>
        {/* Add your signup form and content */}
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