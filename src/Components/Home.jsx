import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';

const CLOUDINARY_CLOUD_NAME = 'dasm9k1z9';
const CLOUDINARY_UPLOAD_PRESET = 'fsad_preset';

const Home = () => {
  const[deleteId, setDeleteId] = useState('');
  const [products, setProducts] = useState([]);
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
  const [editId, setEditId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      const endpoint = isEditing
        ? `http://localhost:8080/products/${editId}`
        : "http://localhost:8080/products";

      const method = isEditing ? "PUT" : "POST";

      const bodyData = isEditing
        ? formData
        : {
          ...formData,
          productId: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000
        };

      response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'add'} product`);
      }

      alert(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} product:`, error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (productId) => {
    const productToEdit = products.find(p => p.productId === productId);
    if (productToEdit) {
      setFormData({
        productId: productToEdit.productId,
        productName: productToEdit.productName,
        subTitle: productToEdit.subTitle,
        originalPrice: productToEdit.originalPrice,
        discountedPrice: productToEdit.discountedPrice,
        offerPercentage: productToEdit.offerPercentage,
        productType: productToEdit.productType,
        image: productToEdit.image
      });
      setEditId(productId);
      setIsEditing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
function deleteProduct() {

  fetch(`http://localhost:8080/products/${deleteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      alert('Product deleted successfully!');
      setDeleteId('');
      fetchProducts();
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      alert('Error deleting product: ' + error.message);
    });
}

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

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const imageUrl = await uploadToCloudinary(file);
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
      } catch (error) {
        console.error('Image upload error:', error);
        alert('Error uploading image: ' + error.message);
      }
    } else {
      alert('Please drop a valid image file.');
    }
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  };

  return (
    <div className="admin-container">
      <div className="form-container">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          {isEditing && (
            <div className="form-group">
              <label htmlFor="productId">Product ID:</label>
              <input
                type="text"
                id="productId"
                name="productId"
                value={formData.productId}
                readOnly
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subTitle">Description:</label>
            <textarea
              id="subTitle"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="originalPrice">Original Price:</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="discountedPrice">Discounted Price:</label>
            <input
              type="number"
              id="discountedPrice"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="offerPercentage">Offer Percentage:</label>
            <input
              type="number"
              id="offerPercentage"
              name="offerPercentage"
              value={formData.offerPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productType">Product Type:</label>
            <select
              id="productType"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              required
              disabled={isLoading}
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
            <label htmlFor="image">Image Upload:</label>
            <div
              className={`drop-area ${isDragging ? 'hover' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              {formData.image ? (
                <>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="image-preview"
                  />
                  <p className="upload-hint">Drop a new image to replace</p>
                </>
              ) : (
                <>
                  <div className="upload-icon">📁</div>
                  <p>Drag and drop your image here</p>
                  <p className="upload-hint">or click to select a file</p>
                </>
              )}
            </div>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={async (e) => {
                if (e.target.files?.[0]) {
                  try {
                    setIsLoading(true);
                    const url = await uploadToCloudinary(e.target.files[0]);
                    setFormData(prev => ({
                      ...prev,
                      image: url
                    }));
                  } catch (error) {
                    console.error('Upload error:', error);
                    alert('Error uploading image: ' + error.message);
                  } finally {
                    setIsLoading(false);
                  }
                }
              }}
            />
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Or paste an image URL"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isEditing ? 'Update Product' : 'Add Product')}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="cancel-button"
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="product-list">
      <input type='number' id='deleteId' value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder='Enter Product ID to delete' />
      <button onClick={deleteProduct}>deleteProduct</button>
      </div>
    </div>
  );
};

export default Home;