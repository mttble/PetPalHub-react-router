import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Login from './Login.jsx';
import SignupPrompt from './SignupPrompt.jsx';
import SignupUser from './SignupUser.jsx';
import SignupCarer from './SignupCarer.jsx';
import NavBar from './NavBar.jsx';
import { Toaster } from 'react-hot-toast';
// <<<<<<< main
// // import AccountUser from './AccountUser.jsx';
// // import CreateProfile from './CreateProfile.jsx';
// // import ViewProfile from './ViewProfile.jsx';
// // import EditProfile from './EditProfile.jsx';
// =======
// import AccountUser from './AccountUser.jsx';
// import CreateProfile from './CreateProfile.jsx';
// import ViewProfile from './ViewProfile.jsx';
// import EditProfile from './EditProfile.jsx';
// >>>>>>> main
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5505';
axios.defaults.withCredentials = true;

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (forName) => {
    setCurrentForm(forName);
  };

  return (
    <>
      <NavBar />
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPrompt />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/signup-carer" element={<SignupCarer />} />
// <<<<<<< main
//         {/* <Route path="/account-user" element={<AccountUser />} /> */}
//         {/* <Route path="/create-profile" element={<CreateProfile />} /> */}
//         {/* <Route path="/view-profile" element={<ViewProfile />} /> */}
//         {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
// =======
//         <Route path="/account-user" element={<AccountUser />} />
//         <Route path="/create-profile" element={<CreateProfile />} />
//         <Route path="/view-profile" element={<ViewProfile />} />
//         <Route path="/edit-profile" element={<EditProfile />} />
// >>>>>>> main
        <Route path="*" element={<h3>Page not found</h3>} />
      </Routes>
    </>
  );
}

export default App;
