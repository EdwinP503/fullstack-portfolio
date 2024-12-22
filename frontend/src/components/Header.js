// File: src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css'; // Custom CSS for the navbar

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="custom-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={require("../assets/images/logow.png")} alt="Edwin's Logo" className="logo" />
          </Link>

          {/* Default Navbar Links for Larger Screens */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Me</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/projects">Portfolio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Me</Link>
              </li>
            </ul>
            <div className="social-icons">
              <a href="https://github.com/EdwinP503" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/edwin-polanco/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Burger Menu for Smaller Screens */}
          <div className="burger-icon" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen} role="button" tabIndex="0">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>

          {/* Slide-in Menu */}
          <div className={`burger-menu ${isMenuOpen ? 'show' : ''}`}>
            <ul className="menu-items">
              <li className="menu-item">
                <Link className="menu-link" to="/" onClick={toggleMenu}>Home</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/about" onClick={toggleMenu}>About Me</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/projects" onClick={toggleMenu}>Portfolio</Link>
              </li>
              <li className="menu-item">
                <Link className="menu-link" to="/contact" onClick={toggleMenu}>Contact Me</Link>
              </li>
              <li className="menu-item social-menu-item">
                <a className="social-link-inline"
                  href="https://github.com/EdwinP503"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                >
                  <i className="fab fa-github"></i>
                </a>
                <a className="social-link-inline"
                  href="https://www.linkedin.com/in/edwin-polanco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
