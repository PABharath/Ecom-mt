// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Existing routes
router.post('/register', userController.registerUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

// Add a new route for adding to cart
router.post('/users/:id/cart',  userController.addToCart);

// Add a new route for adding to wishlist
router.post('/users/:id/wishlist', userController.addToWishlist);


module.exports = router;
