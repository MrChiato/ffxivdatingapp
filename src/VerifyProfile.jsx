import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifyProfile = ({ username }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [verificationId, setVerificationId] = useState('');
  const [lodestoneUrl, setLodestoneUrl] = useState('');
  const [useTestPlaceholder, setUseTestPlaceholder] = useState(false);
  const [developerOverride, setDeveloperOverride] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchVerificationId = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/profile/${username}`);
        setVerificationId(response.data.verificationId);
      } catch (error) {
        console.error('Error fetching verification ID:', error);
      }
    };

    fetchVerificationId();
  }, [username]);

  const handleChange = (e) => {
    setLodestoneUrl(e.target.value);
  };

  const handleToggleTestPlaceholder = () => {
    setUseTestPlaceholder(!useTestPlaceholder);
    if (!useTestPlaceholder) {
      setVerificationId('kupo-ndhhvdfxyywaibyexber');
    } else {
      setVerificationId('');
      const fetchVerificationId = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/profile/${username}`);
          setVerificationId(response.data.verificationId);
        } catch (error) {
          console.error('Error fetching verification ID:', error);
        }
      };
      fetchVerificationId();
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/verify/verify-profile', { 
        username,
        lodestoneUrl,
        useTestPlaceholder,
        developerOverride,
      });
      if (response.data.success) {
        setSuccess(true);
        setVerificationStatus(response.data.message);
        window.location.reload(); // We reload to show the profile, but currently the profile is empty if we don't go to it through dashboard, probably because of how the data is parsed, idk, rn
      } else {
        setSuccess(false);
        setVerificationStatus(response.data.message);
      }
    } catch (error) {
      setSuccess(false);
      if (error.response) {
        setVerificationStatus(error.response.data.message);
      } else {
        setVerificationStatus('Error verifying profile. Please check your internet connection and try again.');
      }
    }
  };

  return (
    <div>
      <h2>Verify Your Profile</h2>
      <p>
        Please enter the following Verification ID into the
        "character__selfintroduction" section of your Lodestone profile:
      </p>
      <p>
        <strong>{verificationId}</strong>
      </p>
      <div>
        <label>Lodestone Profile URL:</label>
        <input
          type="text"
          name="lodestoneUrl"
          value={lodestoneUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={useTestPlaceholder}
            onChange={handleToggleTestPlaceholder}
          />
          Use Test Placeholder
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={developerOverride}
            onChange={() => setDeveloperOverride(!developerOverride)}
          />
          Developer Override
        </label>
      </div>
      <button onClick={handleVerify}>Verify</button>
      {verificationStatus && (
        <p style={{ color: success ? 'green' : 'red' }}>{verificationStatus}</p>
      )}
    </div>
  );
};

export default VerifyProfile;
