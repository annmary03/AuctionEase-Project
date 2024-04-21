import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <div className="image">
          <h1 className="write2">Welcome to the AuctionEase</h1>
          <h4 className="write1">Join us and start bidding or selling today!</h4>
        </div>
        <div className="image">
          <h2 className="write">Getting started</h2>
        </div>
        <div className="image">
          <h3 className="write">Explore Products</h3>
          <h4 className="write1">Discover a wide range of unique items up for auction. From collectibles to electronics, there's something for everyone.</h4>
          <Link to="/productdisplay"> 
            <button className="but"><b>Products</b></button>
          </Link>
        </div>
        {/* <div className="images-container">
          <img src={"https://www.google.com/imgres?q=photoframes%20with%20natures&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61j3QxqisWL.AC_UF1000%2C1000_QL80.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FNature-painting-acrylic-Painting-Synthetic%2Fdp%2FB09ZSS2FKT&docid=WUygbWIwGvWA5M&tbnid=oyPV3ehS09VMeM&vet=12ahUKEwixtN-0qaGFAxW6d2wGHWilBpsQM3oECFYQAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwixtN-0qaGFAxW6d2wGHWilBpsQM3oECFYQAA"} alt="Image" className="images" />
        </div> */}
        <div className="image">
          <h3 className="write">Sell Your Items</h3>
          <h4 className="write1">Ready to sell? List your items for auction and reach a wide audience of potential buyers.</h4>
          
          <Link to="/sell"> 
          <button className="but"><b>Sell</b></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
