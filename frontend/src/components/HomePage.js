import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBriefcase, FaEnvelope } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="text-section">
        <h2 className="title">Software Developer</h2>
        <h1 className="name">Edwin Polanco</h1>
        <h2 className="greeting">Code with Purpose, Impact with Passion.</h2>
        <p className="intro">
          Discover my professional journey, explore the projects I’ve worked on, and learn how you can reach out. 
          Let’s connect!
        </p>
        <div className="btn-group">
          <button onClick={() => navigate('/about')} className="btn">
            <FaUser className="icon" />
            About Me
          </button>
          <button onClick={() => navigate('/projects')} className="btn">
            <FaBriefcase className="icon" />
            Projects
          </button>
          <button onClick={() => navigate('/contact')} className="btn">
            <FaEnvelope className="icon" />
            Contact
          </button>
        </div>
      </div>
      <div className="image-section">
        <img src={require('../assets/images/headshot.jpg')} alt="Professional Portrait" />
      </div>
    </div>
  );
}

export default HomePage;
