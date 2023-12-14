// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/reviews', reviewController.getReviews);
router.post('/reviews', reviewController.postReview);
router.post('/reviews/:reviewId/:action', reviewController.likeDislikeReview);

module.exports = router;
