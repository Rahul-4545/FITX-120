import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Addresspage.css';

const AddressSection = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    street_address: '',
    city: '',
    state_province: '',
    postal_zip_code: '',
    country: '',
    phone_number: ''
  });

  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitted(false);

    const apiUrl = 'http://localhost:3001/address';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage('Address saved successfully');
        setIsSubmitted(true); // Set submission status to true
        navigate('/navcontent'); // Navigate to the Navcontent page
      } else {
        setMessage(result.message || 'Failed to save address');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while saving the address');
    }
  };

  return (
    <div className="address-container">
      <h2>Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            placeholder="Enter your street address"
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="form-group">
          <label>State/Province</label>
          <input
            type="text"
            name="state_province"
            value={formData.state_province}
            onChange={handleChange}
            placeholder="Enter your state/province"
            required
          />
        </div>
        <div className="form-group">
          <label>Postal/ZIP Code</label>
          <input
            type="text"
            name="postal_zip_code"
            value={formData.postal_zip_code}
            onChange={handleChange}
            placeholder="Enter your postal/ZIP code"
            required
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {isSubmitted && <div className="message success-message">Address submitted successfully!</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddressSection;
