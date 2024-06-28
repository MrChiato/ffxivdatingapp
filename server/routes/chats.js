const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat'); 

// Endpoint to get all chats for a user
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const chats = await Chat.find({ participants: user._id }).populate('participants', 'displayName profilePictures');
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ success: false, message: 'Error fetching chats' });
  }
});

module.exports = router;