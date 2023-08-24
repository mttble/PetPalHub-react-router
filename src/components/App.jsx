import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import SignupPrompt from './SignupPrompt.jsx';
import SignupUser from './SignupUser.jsx';
import SignupCarer from './SignupCarer.jsx';
import { Toaster } from 'react-hot-toast';
import AccountCarer from './AccountCarer';
import CreateProfile from './CreateProfile';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
import './App.css';
import axios from 'axios';
import { UserContextProvider } from '../Context/userContext.jsx';
import Dashboard from './Dashboard';
import Layout from './Layout.jsx';


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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignupPrompt />} />
            <Route path="/signup-user" element={<SignupUser />} />
            <Route path="/signup-carer" element={<SignupCarer />} />

            <Route path="/account-carer" element={<AccountCarer />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/view-profile" element={<ViewProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            <Route path="*" element={<h3>Page not found</h3>} />
          </Route>
          
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
