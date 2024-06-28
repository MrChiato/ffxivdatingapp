const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const User = require('../models/User');

router.post('/verify-profile', async (req, res) => {
  const { username, lodestoneUrl, useTestPlaceholder, developerOverride } = req.body;
  const testVerificationId = 'kupo-ndhhvdfxyywaibyexber';
  console.log(`Verifying profile for username: ${username} with Lodestone URL: ${lodestoneUrl}`);

  if (!username || !lodestoneUrl) {
    console.error('Username or Lodestone URL missing');
    return res.status(400).json({ success: false, message: 'Username or Lodestone URL missing' });
  }

  try {
    const existingUser = await User.findOne({ lodestoneUrl });
    if (existingUser && existingUser.username.toLowerCase() !== username.toLowerCase()) {
      console.error('Lodestone profile already linked to another user');
      return res.status(400).json({ success: false, message: 'Lodestone profile already linked to another user.' });
    }

    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (developerOverride) {
      // Developer override logic for test purposes when lodestone is down
      console.log('Developer override enabled');
      const response = await axios.get(lodestoneUrl);
      const html = response.data;

      const $ = cheerio.load(html);
      const displayName = $('.frame__chara__name').text();
      let race = $('.character-block__name').first().text();
      race = race.replace(/\n/g, ' - '); 
      const profileImage = $('.character__detail__image img').attr('src'); 

      const gender = race.includes('♂') ? 'Male' : 'Female'; 

      user.displayName = displayName;
      user.race = race;
      user.profilePictures = [profileImage]; 
      user.lodestoneUrl = lodestoneUrl;
      user.gender = gender;
      await user.save();

      return res.status(200).json({ success: true, message: 'Verification successful!' });
    }

    const verificationIdToCheck = useTestPlaceholder ? testVerificationId : user.verificationId;

    const response = await axios.get(lodestoneUrl);
    const html = response.data;

    const $ = cheerio.load(html);
    const selfIntroduction = $('.character__selfintroduction').text();

    if (selfIntroduction.includes(verificationIdToCheck)) {
      const displayName = $('.frame__chara__name').text();
      let race = $('.character-block__name').first().text();
      race = race.replace(/\n/g, ' - '); 
      const profileImage = $('.character__detail__image img').attr('src');

      const gender = race.includes('♂') ? 'Male' : 'Female'; 

      user.displayName = displayName;
      user.race = race;
      user.profilePictures = [profileImage]; 
      user.lodestoneUrl = lodestoneUrl;
      user.gender = gender;
      user.verified = true;
      await user.save();

      console.log('Verification successful');
      return res.status(200).json({ success: true, message: 'Verification successful!' });
    } else {
      console.error('Verification ID not found in profile');
      return res.status(400).json({ success: false, message: 'Verification ID not found in profile.' });
    }
  } catch (error) {
    console.error('Error verifying profile:', error);
    res.status(500).json({ success: false, message: 'Error verifying profile. Please check your internet connection and try again.' });
  }
});

module.exports = router;
