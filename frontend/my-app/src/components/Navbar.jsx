import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">AuctionEase</div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/products" className="navbar-link">Products</Link>
        <Link to="/sell" className="navbar-link">Sell</Link>
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/signup" className="navbar-link">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
