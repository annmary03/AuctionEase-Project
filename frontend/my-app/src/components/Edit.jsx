import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Edit.css';

const Edit = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const history = useHistory();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    startingBid: '',
    endTime: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    // Fetch product details based on the id from the URL
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9002/api/products/${id}`);
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9002/api/modifyBid/${id}`, product);
      if (response.status === 200) {
        console.log('Product modified successfully!');
        history.push('/sell'); // Redirect to Sell page after successful modification
      } else {
        console.error('Failed to modify product:', response.statusText);
      }
    } catch (error) {
      console.error('Error modifying product:', error);
    }
  };

  const handleCancel = () => {
    // Redirect back to Sell page without making any changes
    history.push('/sell');
  };

  return (
    <div className="edit-container">
      <h2>Edit Product</h2>
      <form className="edit-form" onSubmit={handleSaveChanges}>
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
        {/* Add input fields for other product details (description, startingBid, endTime, category, imageUrl) */}
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
        {/* Add input fields for other product details (startingBid, endTime, category, imageUrl) */}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default Edit;
