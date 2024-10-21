import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import './Header.css';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Відкрити модальне вікно логіну
  const openLoginModal = () => setShowLoginModal(true);

  // Відкрити модальне вікно реєстрації
  const openSignUpModal = () => setShowSignUpModal(true);

  // Закрити модальні вікна
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

      {/* Модальне вікно для логіну */}
      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}

      {/* Модальне вікно для реєстрації */}
      {showSignUpModal && <SignUpModal closeModal={closeSignUpModal} />}
    </>
  );
}

export default Header;
