import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => handleNavigate('/profile')}>Edit Profile</button>
      <button onClick={() => handleNavigate('/chats')}>Chats</button>
      <button onClick={() => handleNavigate('/find-matches')}>Find Matches</button>
    </div>
  );
};

export default Dashboard;