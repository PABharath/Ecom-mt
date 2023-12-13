// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Existing routes
router.post('/register', userController.registerUser);
router.get('/profile', authMiddleware, userController.getUserProfile);

// Add a new route for adding to cart
router.post('/cart', authMiddleware, userController.addToCart);
module.exports = router;
