import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
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
      </div>
    </div>
  );
};

export default Home;
