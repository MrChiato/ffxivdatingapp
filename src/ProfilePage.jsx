import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyProfile from './VerifyProfile';
import './ProfilePage.css';

const ProfilePage = ({ username }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${username}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error loading profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [username]);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Error loading profile.</div>;
  }

  if (!profileData.verified) {
    return <VerifyProfile username={username} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/profile/update/${username}`, profileData);
      if (response.data.success) {
        alert('Profile updated successfully');
        navigate('/dashboard'); // Navigate to dashboard
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div>
      <button onClick={handleBackClick} className="back-button">Back</button>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Display Name:</label>
          <input
            type="text"
            name="displayName"
            value={profileData.displayName}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          {profileData.profilePictures.length > 0 && (
            <img
              src={profileData.profilePictures[0]}
              alt="Profile"
              className="profile-picture"
            />
          )}
        </div>
        <div className="form-group">
          <label>Race:</label>
          <input
            type="text"
            name="race"
            value={profileData.race}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="form-group">
          <label>Profile Pictures:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setProfileData({ ...profileData, profilePictures: Array.from(e.target.files) })}
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Diverse">Diverse</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Interests:</label>
          <input
            type="text"
            name="interests"
            value={profileData.interests}
            onChange={(e) => setProfileData({ ...profileData, interests: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Looking For:</label>
          <input
            type="text"
            name="lookingFor"
            value={profileData.lookingFor}
            onChange={(e) => setProfileData({ ...profileData, lookingFor: e.target.value })}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
