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


import Layout from './Layout.jsx';
import CreatePet from './CreatePet.jsx';


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
            <Route path = "/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPrompt />} />
              <Route path="/signup-user" element={<SignupUser />} />
              <Route path="/signup-carer" element={<SignupCarer />} />




              {/* common routes for both users and carers */}





              {/* Routes specific to carer */}
              <Route path="/account" element={<Account />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/view-profile" element={<ViewProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />






              {/* Routes specific to users */}
              <Route path="/create-pet" element={<CreatePet />} />







              <Route path="*" element={<h3>Page not found</h3>} />
            </Route>
          </Routes>

      </UserContextProvider>
    </>
  );
}

export default App;
