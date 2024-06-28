import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FindMatchesPage.css';

const FindMatchesPage = ({ username }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [matchPopup, setMatchPopup] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/all/${username}`);
        setProfiles(response.data);
      } catch (error) {
        setError('Error fetching profiles');
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, [username]);

  const handleLike = async (likedUsername) => {
    try {
      const response = await axios.post('http://localhost:4000/api/profile/like', { username, likedUsername });
      if (response.data.isMatch) {
        setMatchedUser(response.data.likedUser);
        setMatchPopup(true);
      }
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('Error liking profile:', error);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleStartChat = () => {
    navigate('/chats');
  };

  const handleClosePopup = () => {
    setMatchPopup(false);
    setMatchedUser(null);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (profiles.length === 0) {
    return <div>No profiles available</div>;
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="find-matches">
      <button onClick={handleBackClick} className="back-button">Back</button>
      <h2>Find Matches</h2>
      {currentProfile ? (
        <div className="profile-card">
          <img src={currentProfile.profilePictures[0]} alt="Profile" className="profile-picture" />
          <h3>{currentProfile.displayName}</h3>
          <p>{currentProfile.bio}</p>
          <button onClick={() => handleLike(currentProfile.username)}>Like</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      ) : (
        <div>No more profiles</div>
      )}
      {matchPopup && matchedUser && (
        <div className="match-popup">
          <div className="match-popup-content">
            <h3>You got a match!</h3>
            <img src={matchedUser.profilePictures[0]} alt="Profile" className="profile-picture" />
            <h4>{matchedUser.displayName}</h4>
            <button onClick={handleStartChat}>Start Chat</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindMatchesPage;
