import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="landing-page">
      <h2>Welcome to Video Game Character Matchmaker</h2>
      <div className="button-container">
        <button onClick={() => handleNavigate('/login')}>Login</button>
        <button onClick={() => handleNavigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;