// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Profile from './components/Profile'; // Import the Profile component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage authentication status

  const handleLogin = (user) => {
    // Logic to handle successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic to handle logout
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Pass authentication props to Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} /> {/* Route for the Profile component */}
        {/* Pass handleLogin function to Login component */}
        <Route path="/login" element={<Login setLoginUser={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
