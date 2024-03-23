import React from 'react';
import Navbar from './Navbar'; // Update the import statement
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to AuctionEase</h1>
        <p>Start managing your auctions with ease.</p>
      </div>
    </div>
  );
};

export default Home;
