import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onLike, onSkip }) => {
  return (
    <div className="profile-card">
      {profile.profilePictures.length > 0 && (
        <img src={profile.profilePictures[0]} alt="Profile" className="profile-picture" />
      )}
      <h2>{profile.displayName}</h2>
      <p><strong>Race:</strong> {profile.race}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Interests:</strong> {profile.interests}</p>
      <p><strong>Looking For:</strong> {profile.lookingFor}</p>
      <button onClick={() => onLike(profile._id)}>Like</button>
      <button onClick={() => onSkip(profile._id)}>Skip</button>
    </div>
  );
};

export default ProfileCard;