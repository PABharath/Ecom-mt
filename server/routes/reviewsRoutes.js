const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewcontroller');

router.get('/reviews', reviewController.getReviews);
router.post('/reviews', reviewController.postReview);
router.post('/reviews/:reviewId/:action', reviewController.updateReview);

module.exports = router;
