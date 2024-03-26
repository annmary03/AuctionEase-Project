// Sell.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sell.css';

const Sell = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      // Fetch products data from backend API
      const fetchProducts = async () => {
        try {
        // Retrieve token from local storage
          const token = localStorage.getItem('token');
           // Send authenticated request to backend API
           const response = await axios.get('http://localhost:9002/api/sell', {
            headers: {
              Authorization: `Bearer ${token}` // Include token in the Authorization header
            }
          });

          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);

    const handleEdit = (productId) => {
        // Handle edit action for the product with productId
        console.log(`Editing product with ID ${productId}`);
      };
    
      const handleDelete = async (productId) => {
        try {
          // Retrieve token from local storage
          const token = localStorage.getItem('token');
    
          // Send authenticated request to delete product
          await axios.delete(`http://localhost:9002/api/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Include token in the Authorization header
            }
          });
    
          // Refresh product list after deletion
          
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

  return (
    <div className="sell-container">
      <h2 className="sell-heading">Listed Auctions</h2>
      <div className="products-list">
      <p><Link to="/create">Create a product</Link></p>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Starting Bid: {product.startingBid}</p>
            <p>Current Bid: {product.currentBid}</p>
            <p>End Time: {product.endTime}</p>
            <p>User ID: {product.userId}</p>
            <div className="action-buttons">
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
