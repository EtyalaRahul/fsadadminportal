import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    subTitle: '',
    originalPrice: '',
    discountedPrice: '',
    offerPercentage: '',
    productType: '',
    image: ''
  });
  
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      const url = isEditing 
        ? `http://localhost:8080/products/${editId}`
        : "http://localhost:8080/products";

      const method = isEditing ? "PUT" : "POST";

      const productData = isEditing 
        ? formData 
        : { ...formData, productId: Math.floor(Math.random() * 9000) + 1000 };

      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        alert(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
        resetForm();
      } else {
        throw new Error(`Failed to ${isEditing ? 'update' : 'add'} product`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!deleteId) {
      alert('Please enter a product ID');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        alert('Product deleted successfully!');
        setDeleteId('');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      productName: '',
      subTitle: '',
      originalPrice: '',
      discountedPrice: '',
      offerPercentage: '',
      productType: '',
      image: ''
    });
    setEditId('');
    setIsEditing(false);
  };

  return (
    <div className="crud-container">
      {/* Add/Edit Product Form */}
      <div className="form-container">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          {isEditing && (
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="text"
                value={formData.productId}
                readOnly
                className="read-only-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Original Price:</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Discounted Price:</label>
            <input
              type="number"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Offer Percentage:</label>
            <input
              type="number"
              name="offerPercentage"
              value={formData.offerPercentage}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product Type:</label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
            >
              <option value="">Select a type</option>
              <option value="FarmFresh">Farm Fresh</option>
              <option value="DailyBasket">Daily Basket</option>
              <option value="Decoratives">Decoratives</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Electronics">Electronics</option>
              <option value="Cleaners">Cleaners</option>
            </select>
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                onClick={resetForm}
                className="cancel-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Delete Product Form */}
      <div className="form-container">
        <h2>Delete Product</h2>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label>Product ID:</label>
            <input
              type="number"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              min="0"
              max="9999"
              required
              placeholder="Enter product ID"
            />
          </div>
          <button type="submit" className="delete-btn">
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;