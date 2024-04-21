import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">AuctionEase</div>
      <div className="navbar-right">
       
        {isLoggedIn && !isAdmin && (
          <>
             <Link to="/home" className="navbar-link">Home</Link>
            <Link to="/productdisplay" className="navbar-link">Products</Link>
            <Link to="/sell" className="navbar-link">Sell</Link>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <button onClick={handleLogout} className="nbutton-like">Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
             <Link to="/" className="navbar-link">Home</Link>
            <Link to="/signup" className="navbar-link">Signup</Link>
            <Link to="/login" className="navbar-link">Login</Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link to="/admin" className="navbar-link">Users</Link>
            <button onClick={handleLogout} className="nbutton-like">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
