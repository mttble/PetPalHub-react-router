import React from 'react'
import { Route, Routes } from "react-router-dom"

import Home from './Home.jsx'
import Login from './Login.jsx'
import SignupPrompt from './SignupPrompt.jsx'
import SignupUser from './SignupUser.jsx'
import SignupCarer from './SignupCarer.jsx'
import NavBar from "./NavBar.jsx"

import './App.css'




function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPrompt />} />
        <Route path="/signup-user" element={<SignupUser />} />
        <Route path="/signup-carer" element={<SignupCarer />} />
        <Route path='*' element={<h3>Page not found</h3>} />
        {/* Add more Route elements for other pages */}
      </Routes>
    </>
  );
}

export default App