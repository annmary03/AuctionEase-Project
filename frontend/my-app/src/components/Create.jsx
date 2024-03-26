import React, { useState } from 'react';
import './Create.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    startingBid: '',
    endTime: '', 
    image: '' 
  });

  const navigate = useNavigate(); 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Function to get JWT token from local storage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Retrieve token from local storage
        const token = getToken();

      // Retrieve user ID from decoded token
        const userId = jwtDecode(token).userId;

      // Construct product data with user ID
        const productData = {
        ...product,
        userId: userId
      };

        const response = await fetch('http://localhost:9002/api/addBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the Authorization header
        },
        body: JSON.stringify(productData)
      });
      
      if (response.ok) {
        // Handle success
        console.log('Product added successfully!');
        // Reset form fields after successful submission
        setProduct({
          name: '',
          category: '',
          description: '',
          startingBid: '',
          endTime: '',
          image: ' '
        });
        // Show alert for successful addition
        alert('Product added successfully!');
        navigate('/sell'); 
      } else {
        // Handle error
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  
  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Starting Bid:</label>
          <input
            type="number"
            name="startingBid"
            value={product.startingBid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={product.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item Image:</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Create;
