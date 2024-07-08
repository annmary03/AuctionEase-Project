import React from "react";
import "./Product.css"; 

function Product() {
  return (
    <form className="searchForm">
      <div className="searchInputContainer">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f77f7234409dde35002f58f606a601a2a540df62a87e9c54c98cd6ecc1d346c8?apiKey=b5eabe75bd3e4616a972f15f681a6aab&"
          alt="Search icon"
          className="searchIcon"
          loading="lazy"
        />
        <label htmlFor="search-input" className="visuallyHidden">
          Search auctions
        </label>
        <input
          type="text"
          id="search-input"
          className="searchInput"
          placeholder="Search auctions"
        />
      </div>
      <button type="submit" className="searchButton">
        Search
      </button>
    </form>
  );
}

export default Product;
