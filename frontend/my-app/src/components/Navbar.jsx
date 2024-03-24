// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">AuctionEase</div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/products" className="navbar-link">Products</Link>
        <Link to="/sell" className="navbar-link">Sell</Link>
        {isLoggedIn ? (
          // If user is logged in, show Profile and Logout buttons
          <>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <button onClick={handleLogout} className="navbar-link">Logout</button>
          </>
        ) : (
          // If user is not logged in, show Signup and Login buttons
          <>
            <Link to="/signup" className="navbar-link">Signup</Link>
            <Link to="/login" className="navbar-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
