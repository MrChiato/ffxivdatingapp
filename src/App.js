import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ProfilePage from './ProfilePage';
import FindMatchesPage from './FindMatchesPage';
import Dashboard from './Dashboard';
import Chats from './Chats';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm setUsername={setUsername} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage username={username} />} />
        <Route path="/find-matches" element={<FindMatchesPage username={username} />} />
        <Route path="/chats" element={<Chats username={username} />} />
      </Routes>
    </Router>
  );
};

export default App;
