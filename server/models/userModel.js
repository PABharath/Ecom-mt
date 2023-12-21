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
  resetToken: String,
  resetTokenExpiration: Date,
  // Additional user-related data
  cart: [{ 
     product:String ,
     quantity: Number 
    }],  
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
