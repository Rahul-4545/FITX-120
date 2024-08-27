import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const apiUrl = 'http://localhost:3001/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || 'Failed to login');
        return;
      }

      localStorage.setItem('user', JSON.stringify(result.user));

      navigate('/navcontent'); // Change to the appropriate page after login
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while logging in');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="unique-login-container">
      <h1 className="unique-login-title">Login Form</h1>
      <form onSubmit={handleSubmit} className="unique-login-form">
        <div className="unique-login-field">
          <label className="unique-login-label">
            Email:
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="unique-login-input"
            />
          </label>
        </div>
        <div className="unique-login-field">
          <label className="unique-login-label">
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="unique-login-input"
            />
          </label>
        </div>
        <div className="unique-login-button-container">
          <button type="submit" className="unique-login-button">Login</button>
        </div>
      </form>
      {message && <div className="unique-login-error-message">{message}</div>}
      <div className="unique-login-register">
        <p>Don't have an account?</p>
        <button onClick={handleRegisterRedirect} className="unique-register-button">Register Here</button>
      </div>
    </div>
  );
};

export default Login;
