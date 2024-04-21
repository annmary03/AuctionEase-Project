//Create.jsx
import './Create.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';

const Create = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dk3ryoigu' } });
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    startingBid: '',
    endTime: '',
    category: '',
    image: null,
  });

  const [imageUrl, setUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      if (files.length > 0) {
        UploadToCloudinary(files[0]);
      }
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!imageUrl) {
      console.error('Image is required');
      return;
    }
  
    const requestBody = {
      name: product.name,
      description: product.description,
      startingBid: product.startingBid,
      endTime:product.endTime, 
      category: product.category,
      imageUrl: imageUrl,
    };
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('http://localhost:9002/api/addBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log('Product added successfully!');
        navigate('/sell');

        setProduct({
          name: '',
          description: '',
          startingBid: '',
          endTime: '',
          category: '',
          image: null,
        });
        alert('Product added successfully!');
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  const UploadToCloudinary = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    formData.append('cloud_name', 'dk3ryoigu');

    fetch('https://api.cloudinary.com/v1_1/dk3ryoigu/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="create-container">
      <h2 className="create-heading">Add Product</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="startingBid">Starting Bid:</label>
          <input
            type="number"
            id="startingBid"
            name="startingBid"
            value={product.startingBid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
  type="datetime-local"
  id="endTime"
  name="endTime"
  value={product.endTime}
  onChange={handleChange}
  required
/>




        </div>
        <div>
        <label htmlFor="category">Category:</label>
        <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Art">Art</option>  
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            accept="image/*"
            id="image"
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