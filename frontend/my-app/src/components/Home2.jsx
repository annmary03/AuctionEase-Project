import React from 'react';
import { Link } from 'react-router-dom';
import './Home2.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="card">
        <div className="card-content">
          <h1 className="write2">Welcome to AuctionEase</h1>
          <h5 className="write1">Manage your auction events, bidders, and items with ease</h5>
          <button className="bu"><Link to="/login" className="navbar-link"><b>-----Let's Explore----</b></Link></button>
        </div>
      </div>
    </div>
  );
};

export default Home;