// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to fetch cart items for a user
router.get('/api/profile/cart',  cartController.getCartItems);

// Route to increment a cart item quantity
router.post('/api/profile/cart/increment', cartController.incrementCartItem);

// Route to decrement a cart item quantity
router.post('/api/profile/cart/decrement', cartController.decrementCartItem);

// Route to delete a cart item
router.delete('/api/profile/cart/delete', cartController.deleteCartItem);

module.exports = router;
