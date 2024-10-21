import React, { useState } from 'react';
import axios from 'axios';
import './SignUpModal/SignUpModal.css';

const SignUpModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const data = { email, password };
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      closeModal();  // Close the modal window after success SigUp
    } catch (error) {
      console.error('Sign up failed:', error.response?.data || error.message);
      setErrorMessage('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Sign Up</h2>
        <form className="modal-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label>Email:</label>
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
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" className="close-button" onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
