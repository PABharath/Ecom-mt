// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to fetch cart items for a user
router.get('/api/profile/cart', cartController.getCartItems);

module.exports = router;
