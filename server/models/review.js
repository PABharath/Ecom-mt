const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: String,
  starRating: Number,
  username: String,
  comment: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

