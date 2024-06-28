import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    gender: 'Male',
    interests: '',
    lookingFor: '',
    pictures: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pictures: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('interests', formData.interests);
    formDataToSend.append('lookingFor', formData.lookingFor);
    formDataToSend.append('pictures', formData.pictures);

    try {
      await axios.post('http://localhost:4000/api/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Diverse">Diverse</option>
        </select>
      </div>
      <div>
        <label>Interests:</label>
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Looking for:</label>
        <input
          type="text"
          name="lookingFor"
          value={formData.lookingFor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Picture:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
