import React, { useContext } from 'react';
import './Home.css'
import { UserContext } from '../Context/userContext';


function Home() {
  // Logic for login page
  const userContext = useContext(UserContext);

  if (userContext.user) {
      if (userContext.user.role === 'user') {
          return (
              <div className='dashboard-welcome'>
                  <h1>Welcome to PetPal Hub, {userContext.user.firstName}</h1>
              </div>
              
          );
      } else if (userContext.user.role === 'carer') {
          return (
              <div className='dashboard-welcome'>
                  <h1>Welcome to PetPal Hub, {userContext.user.firstName}</h1>
              </div>
          );
      }
  }

  return (
    <div className='centered-container-home'>
      <h1>Welcome to PetPal Hub</h1>
    </div>
  )
};

export default Home;