import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Chat = ({ username }) => {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId) {
      // Fetch chat data
      axios.get(`http://localhost:4000/api/chat/${chatId}`)
        .then(response => setChat(response.data))
        .catch(error => console.error('Error fetching chat:', error));
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    try {
      await axios.post(`http://localhost:4000/api/chat/${chatId}/message`, { sender: username, message });
      setChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, { sender: username, message }],
      }));
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!chat) return <div>Loading chat...</div>;

  return (
    <div className="chat-container">
      <button onClick={() => navigate('/chats')}>Back to Chats</button>
      <div className="messages">
        {chat.messages.map((msg, index) => (
          <div key={index} className={msg.sender === username ? 'message own' : 'message'}>
            <strong>{msg.sender}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;