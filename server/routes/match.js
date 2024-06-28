const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/profiles', async (req, res) => {
  const { exclude } = req.query;
  try {
    const profiles = await User.find({ username: { $ne: exclude } });
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/like', async (req, res) => {
  const { liker, liked } = req.body;
  try {
    const likerUser = await User.findOne({ username: liker });
    const likedUser = await User.findOne({ username: liked });

    if (!likerUser || !likedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    likerUser.likes = likerUser.likes || [];
    likedUser.likedBy = likedUser.likedBy || [];

    if (!likerUser.likes.includes(liked)) {
      likerUser.likes.push(liked);
    }

    if (!likedUser.likedBy.includes(liker)) {
      likedUser.likedBy.push(liker);
    }

    await likerUser.save();
    await likedUser.save();

    if (likedUser.likes.includes(liker)) {
      res.status(200).json({ success: true, match: true });
    } else {
      res.status(200).json({ success: true, match: false });
    }
  } catch (error) {
    console.error('Error liking profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;