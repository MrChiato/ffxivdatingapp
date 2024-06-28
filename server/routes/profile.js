const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get profile
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ success: false, message: 'Error fetching profile' });
    }
  });

// Update profile
router.post('/update/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Error updating profile' });
  }
});

router.get('/all/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const users = await User.find({ username: { $ne: username }, verified: true });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ success: false, message: 'Error fetching profiles' });
    }
  });

  router.get('/matches/:username', async (req, res) => {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const matches = await User.find({ username: { $in: user.matches } });
      res.status(200).json(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ success: false, message: 'Error fetching matches' });
    }
  });

  router.post('/like', async (req, res) => {
    const { username, likedUsername } = req.body;
    try {
      const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
      const likedUser = await User.findOne({ username: new RegExp(`^${likedUsername}$`, 'i') });
  
      if (!user || !likedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      if (!user.likes) user.likes = [];
      if (!user.likedBy) user.likedBy = [];
      if (!user.matches) user.matches = [];
      if (!likedUser.likes) likedUser.likes = [];
      if (!likedUser.likedBy) likedUser.likedBy = [];
      if (!likedUser.matches) likedUser.matches = [];
  
      let isMatch = false;
      if (!user.likes.includes(likedUsername)) {
        user.likes.push(likedUsername);
        await user.save();
      }
  
      if (!likedUser.likedBy.includes(username)) {
        likedUser.likedBy.push(username);
        await likedUser.save();
      }
  
      if (likedUser.likes.includes(username)) {
        isMatch = true;
        user.matches.push(likedUsername);
        likedUser.matches.push(username);
        await user.save();
        await likedUser.save();
      }
  
      res.status(200).json({ success: true, isMatch, likedUser });
    } catch (error) {
      console.error('Error liking profile:', error);
      res.status(500).json({ success: false, message: 'Error liking profile' });
    }
  });
  

module.exports = router;
