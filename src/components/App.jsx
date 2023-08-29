import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import SignupPrompt from './SignupPrompt.jsx';
import SignupUser from './SignupUser.jsx';
import SignupCarer from './SignupCarer.jsx';
import { Toaster } from 'react-hot-toast';
import Account from './Account';
import CreateProfile from './CreateProfile';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
import './App.css';
import axios from 'axios';
import { UserContextProvider } from '../Context/userContext.jsx';

import ViewPets from './ViewPets.jsx';
import Layout from './Layout.jsx';
import CreatePet from './CreatePet.jsx';
import BookingForm from './BookingForm';
import BookingPage from './BookingPage'; // Import BookingPage component
import PetPalRequests from './PetPalRequests.jsx';
import PetDetails from './PetDetails'

axios.defaults.baseURL = 'http://localhost:5505';
axios.defaults.withCredentials = true;

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  };

  return (
    <>
      <UserContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPrompt />} />
            <Route path="/signup-user" element={<SignupUser />} />
            <Route path="/signup-carer" element={<SignupCarer />} />


            {/* common routes for both users and carers */}
            <Route path="/booking-page" element={<BookingPage />} />
            <Route path="/petpal-requests" element={<PetPalRequests />} />
            <Route path="/pet-details/:petId" element={<PetDetails />} />

            

            {/* Routes specific to carer */}
            <Route path="/account" element={<Account />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />


            {/* Routes specific to users */}
            <Route path="/create-pet" element={<CreatePet />} />
            <Route path="/view-pets" element={<ViewPets />} />
            <Route path="/booking-form" element={<BookingForm />} />


            <Route path="*" element={<h3>Page not found</h3>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
