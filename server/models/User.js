const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  profilePictures: { type: [String], default: [] },
  bio: { type: String },
  gender: { type: String },
  interests: { type: [String], default: [] },
  lookingFor: { type: String },
  lodestoneUrl: { type: String, unique: true, sparse: true },
  verificationId: { type: String },
  verified: { type: Boolean, default: false },
  likes: { type: [String], default: [] },
  likedBy: { type: [String], default: [] },
  matches: { type: [String], default: [] }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
