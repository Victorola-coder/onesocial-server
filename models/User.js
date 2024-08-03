const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  facebookId: String,
  twitterId: String,
  instagramId: String,
  linkedinId: String,
  accessToken: String,
  refreshToken: String,
  accessTokenSecret: String, // For Twitter
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);

