import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chats.css';

const Chats = ({ username }) => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/matches/${username}`);
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [username]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="chats">
      <button onClick={handleBackClick} className="back-button">Back</button>
      <h2>Chats</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.username} className="chat-item">
            <img
              src={match.profilePictures[0]}
              alt="Profile"
              className="profile-picture"
            />
            <div className="chat-details">
              <p className="chat-name">{match.displayName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
