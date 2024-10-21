import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import './Header.css';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  
  const openLoginModal = () => setShowLoginModal(true);

 
  const openSignUpModal = () => setShowSignUpModal(true);

 
  const closeLoginModal = () => setShowLoginModal(false);
  const closeSignUpModal = () => setShowSignUpModal(false);

  return (
    <>
      <header className="header">
        <h1 className="logo">Photoshare</h1>
        <div className="button-container">
        <button className="login-button" onClick={openLoginModal}>
          Login
        </button>
        <button className="signup-button" onClick={openSignUpModal}>
          Sign Up
        </button>
        </div>
      </header>

      {/* Modal window for LogIn */}
      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}

      {/* Modal window for SignUp */}
      {showSignUpModal && <SignUpModal closeModal={closeSignUpModal} />}
    </>
  );
}

export default Header;
