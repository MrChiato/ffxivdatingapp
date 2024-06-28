const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.get('/chats/:username', async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.params.username });
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/chat/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/chat/:id/message', async (req, res) => {
  const { sender, message } = req.body;
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    chat.messages.push({ sender, message });
    await chat.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;