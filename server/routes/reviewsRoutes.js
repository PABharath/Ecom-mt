const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route for fetching product reviews
router.get('/product-reviews', reviewController.getProductReviews);

// Route for fetching all reviews
router.get('/all-reviews', reviewController.getAllReviews);

// New route for fetching 5-star reviews
router.get('/five-star-reviews', reviewController.getFiveStarReviews);

// Route for posting product reviews
router.post('/products/:productId/reviews', reviewController.postReview); // Add this line

module.exports = router;
