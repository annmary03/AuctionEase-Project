import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      <div className="content">
        <div className="text-container">
          <h1 className="home-heading">Welcome to AuctionEase</h1>
          <p className="tagline">Manage your auctions, bidders, and items with ease</p>
        </div>
  
        <div className="buttons">
          <Link className="home-link" to="/productdisplay">
            Products
          </Link>
          <Link className="home-link" to="/sell">
            Sell
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
