import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal/LoginModal.css';

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const data = new URLSearchParams();
        data.append('grant_type', '');  
        data.append('username', email);  
        data.append('password', password);
        data.append('scope', '');  
        data.append('client_id', '');  
        data.append('client_secret', '');

      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
      });

      console.log(response.data);
      closeModal();  // Close the modal window after success logIn
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Login</h2>
        <form className="modal-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email (Username):</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" className="close-button" onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
