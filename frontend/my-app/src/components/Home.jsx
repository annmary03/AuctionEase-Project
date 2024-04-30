import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      <div className="content">
<<<<<<< HEAD
        <div className="text-container">
          <h1 className="home-heading">Welcome to AuctionEase</h1>
          <p className="tagline">Manage your auctions, bidders, and items with ease</p>
        </div>
  
        <div className="buttons">
          <button className="home-link" onClick={() => { window.location.href = "/productdisplay"; }}>
            Products
          </button>
          <button className="home-link" onClick={() => { window.location.href = "/sell"; }}>
            Sell
          </button>
        </div>
=======
      <div className="image">
       <h1 className="write2">Welcome to the AuctionEase</h1>
       <h4 className="write1">Manage your auction events,bidders,and items with ease</h4>
      </div>
      <div className="image">
        <h2 className="write">Getting started</h2>
      </div>
      <div className="image">
        <h3 className="write">Create an auction</h3>
        <h4 className="write1">Easily create a new auction event.Set the date,time and location.</h4>
        <button className="but"><b><Link to="/login" className="navbar-link">Create</Link></b></button>
      </div>
      
      <div className="image">
        <h3 className="write">Add items</h3>
        <h4 className="write1">Quickly add items to your auction event,include images,descriptions and starting bid amounts.</h4>
        <button className="but"><b><Link to="/login" className="navbar-link">Add</Link></b></button>
      </div>
>>>>>>> 0165d16c53b05ea230d159e6031fdfa35ec15f79
      </div>
    </div>
  );
};

export default Home;
