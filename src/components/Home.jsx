import React, { useContext, useState, useEffect } from 'react';
import './Home.css'
import { UserContext } from '../Context/userContext';
import ProfileCard from './ProfileCard'


function Home() {
  
  const userContext = useContext(UserContext);
  
  

  return (
    <div>
      <div className="dashboard-welcome">
        {userContext.user ? (
          <h1>Welcome to PetPal Hub, {userContext.user.firstName}!</h1>
        ) : (
          <h1>Welcome to PetPal Hub</h1>
        )}
      </div>
      <div className="profile-cards">
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
};

export default Home;