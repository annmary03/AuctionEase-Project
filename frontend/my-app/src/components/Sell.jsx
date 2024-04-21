import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns-tz'; 
import { Link } from 'react-router-dom';
import './Sell.css'
import { Delete, Edit } from '@mui/icons-material';

const Sell = () => {
  const [products, setProducts] = useState([]);

  // Inside the Sell component
const formatLocalTime = (utcTime) => {
  // Convert UTC time to local time
  return format(new Date(utcTime), 'yyyy-MM-dd HH:mm', { timeZone: 'your-local-timezone' });
}

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9002/api/sell', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9002/api/deleteBid/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter((product) => product._id !== productId));
      window.alert('Deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-auction-container">
      <Link to="/create" className="add-product-button">Add a Product</Link>
      <h1 className="sell-heading">Listed Auctions</h1>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="action-buttons">
              <button onClick={() => handleDelete(product._id)} className="action-button"><Delete /></button>
              <Link to={`/editsell/${product._id}`} className="action-button1"><Edit /></Link>
            </div>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-starting-bid">Starting Bid: {product.startingBid}</p>
              <p className="product-current-bid">Current Bid: {product.currentBid}</p>
              <p className="product-end-time">End Time: {formatLocalTime(product.endTime)}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;

