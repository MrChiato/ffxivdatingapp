import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatList = ({ username }) => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all chats for the user
    axios.get(`http://localhost:4000/api/chats/${username}`)
      .then(response => setChats(response.data))
      .catch(error => console.error('Error fetching chats:', error));
  }, [username]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  if (chats.length === 0) return <div>No chats yet</div>;

  return (
    <div className="chat-list">
      <button onClick={() => navigate('/profile')}>Back to Profile</button>
      {chats.map(chat => (
        <div key={chat._id} onClick={() => handleChatClick(chat._id)}>
          Chat with {chat.users.find(user => user !== username)}
        </div>
      ))}
    </div>
  );
};

export default ChatList;