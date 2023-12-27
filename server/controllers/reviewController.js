const Review = require('../models/reviewModel');

// Fetch reviews based on productId
exports.getProductReviews = async (req, res) => {
  try {
    const productId = req.query.productId;
    const filteredReviews = await Review.find({ productId });

    console.log('Fetched product reviews:', filteredReviews);

    res.json(filteredReviews);
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find();


    res.json(allReviews);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// controllers/reviewController.js

exports.getFiveStarReviews = async (req, res) => {
  try {
    const fiveStarReviews = await Review.find({ starRating: 5 });

    console.log('Fetched 5-star reviews:', fiveStarReviews);

    res.json(fiveStarReviews);
  } catch (error) {
    console.error('Error fetching 5-star reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.postReview = async (req, res) => {
  try {
    const { productId, starRating, comment, username } = req.body;

    // Validate and sanitize input here if needed

    const newReview = new Review({
      productId,
      starRating,
      comment,
      username,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error posting review:', error);
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
    console.error('Error updating like/dislike:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
