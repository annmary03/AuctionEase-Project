// ProductItem.jsx
import React from "react";
import './ProductItem.css'

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="starting-bid">Starting bid: {product.startingBid}</p>
      <p className="category">Category: {product.category}</p>
    </div>
  );
};

export default ProductItem;
