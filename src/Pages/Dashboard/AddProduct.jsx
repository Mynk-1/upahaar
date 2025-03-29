import React, { useState } from 'react';

const ProductAddForm = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous messages
    setError('');
    setSuccess('');

    try {
      // Validate JSON
      const productData = JSON.parse(jsonInput);

      // Make API call with credentials include
      const response = await fetch('http://www.upahaar.store/api/product/add', {
        method: 'POST',
        credentials: 'include', // This is key for sending cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess('Product added successfully!');
      console.log('Product added:', result);
    } catch (err) {
      // Handle JSON parsing errors or API call errors
      setError(err.message || 'Failed to add product');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        Add New Product
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea 
          style={{
            width: '100%',
            minHeight: '200px',
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          placeholder="Enter product JSON here"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        
        {error && (
          <div style={{
            backgroundColor: '#ffdddd',
            color: 'red',
            padding: '10px',
            marginBottom: '1rem',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{
            backgroundColor: '#ddffdd',
            color: 'green',
            padding: '10px',
            marginBottom: '1rem',
            borderRadius: '4px'
          }}>
            {success}
          </div>
        )}
        
        <button 
          type="submit"
          disabled={!jsonInput.trim()}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: !jsonInput.trim() ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !jsonInput.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAddForm;