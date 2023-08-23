import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignupPrompt from './SignupPrompt';
import SignupUser from './SignupUser';
import SignupCarer from './SignupCarer';
import NavBar from './NavBar';
import { Toaster } from 'react-hot-toast';
import AccountUser from './AccountUser';
import CreateProfile from './CreateProfile';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
import './App.css';
import axios from 'axios';
import { UserContextProvider } from '../Context/userContext.jsx';



axios.defaults.baseURL = 'http://localhost:5505';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <NavBar />
        <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignupPrompt />} />
          <Route path="/signup-user" element={<SignupUser />} />
          <Route path="/signup-carer" element={<SignupCarer />} />
          <Route path="/account-user" element={<AccountUser />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<h3>Page not found</h3>} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
