// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Sell from './components/Sell';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar'; // Import your Navbar component

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Render the Navbar component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
