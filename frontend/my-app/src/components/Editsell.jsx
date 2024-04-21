import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import './Editsell.css';


const EditSell = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    startingBid: '',
    endTime: '',
    category: '',
    imageUrl: '',
  });
  const [requestBody, setRequestBody] = useState({
    name: '',
    description: '',
    startingBid: '',
    endTime: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.get(`http://localhost:9002/api/productdescription/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, description, startingBid, endTime, category, imageUrl } = response.data;

      // Format the date for the datetime-local input field
      const formattedEndTime = new Date(endTime).toISOString().slice(0, 16);
        console.log(response.data)
        setProduct({
          name,
          description,
          startingBid,
          endTime: formattedEndTime, // Set the formatted date
          category,
          imageUrl,
        });
        setRequestBody(response.data); // Set requestBody with initial data
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    // Update requestBody with the new value
    const updatedRequestBody = { ...requestBody, [name]: value };
    setRequestBody(updatedRequestBody);
  };

 const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' '); // Format to YYYY-MM-DDTHH:MM:SS
  

    return formattedDate;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedEndTime = formatDate(product.endTime);
  
    const requestBody = {
      name: product.name,
      description: product.description,
      startingBid: product.startingBid,
      endTime: product.endTime,
      category: product.category,
      imageUrl: product.imageUrl,
    };
  
    try {
      const token = localStorage.getItem('token');
  
      // Upload new image to Cloudinary if a new image was selected
      if (product.imageUrl instanceof File) {
        const formData = new FormData();
        formData.append('file', product.imageUrl);
        formData.append('upload_preset', 'ml_default');
        formData.append('cloud_name', 'dk3ryoigu');
  
        const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dk3ryoigu/image/upload', {
          method: 'POST',
          body: formData,
        });
        const cloudinaryData = await cloudinaryResponse.json();
        const newImageUrl = cloudinaryData.secure_url;
        setProduct({ ...product, imageUrl: newImageUrl });
        setRequestBody({ ...requestBody, imageUrl: newImageUrl });
      }
  
      console.log(requestBody);
  
      // Send PUT request to update the product
      await axios.put(`http://localhost:9002/api/modifyBid/${id}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Alert and navigate to sell page
      window.alert('Changes saved successfully!');
      navigate('/sell');
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  

  const handleCancel = () => {
    navigate('/sell');
  };
  
  return (
    <div className="edit-sell-container">
      <h1 className="edit-sell-heading">Edit Product</h1>
      <div className="image-container">
        {product.imageUrl && <img className="current-image" src={product.imageUrl} alt="Product" />}
      </div>
      <div className="form-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={product.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={product.description} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="startingBid">Starting Bid:</label>
            <input type="number" id="startingBid" name="startingBid" value={product.startingBid} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="endTime">End Time:</label>
            <input type="datetime-local" id="endTime" name="endTime" value={product.endTime} onChange={handleChange} onBlur={() => {
              const dummyElement = document.createElement('button');
              dummyElement.style.display = 'none';
              document.body.appendChild(dummyElement);
              dummyElement.focus();
              document.body.removeChild(dummyElement);
            }}
              required />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select name="category" id="category" value={product.category} onChange={handleChange} required>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
            </select>
          </div>
          <div>
            <label>New Image:</label>
            <input type="file" accept="image/*" id="image" name="image" onChange={(e) => setProduct({ ...product, imageUrl: e.target.files[0] })} />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};


export default EditSell;
