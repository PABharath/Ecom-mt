// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
  },
  contact: String,
  address: String,
  password: String,
  resetToken: String, // Add a field to store the reset token
  resetTokenExpiration: Date, // Add a field to store the reset token expiration date
});

const User = mongoose.model('User', userSchema);
module.exports = User;
