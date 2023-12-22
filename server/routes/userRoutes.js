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
router.post('/:id/insert', userController.addAddress);
module.exports = router;
