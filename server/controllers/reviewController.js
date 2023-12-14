// controllers/reviewController.js

const Review = require('../models/reviewModel');

exports.getReviews = async (req, res) => {
  try {
    const productId = req.query.productId;
    const filteredReviews = await Review.find({ productId });
    res.json(filteredReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.postReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.likeDislikeReview = async (req, res) => {
  const { reviewId, action } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (action === 'like') {
      review.likes += 1;
    } else if (action === 'dislike') {
      review.dislikes += 1;
    }

    await review.save();

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
