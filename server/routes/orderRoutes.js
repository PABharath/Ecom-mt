// routes/orderRoutes.js
// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create order route
router.post('/create-order', orderController.createOrder);

// Get orders route
router.get('/get-orders', orderController.getOrders);

// Get order details route
// router.get('/get-order-details/:orderId', orderController.getOrderDetails);
router.get('/get-order-details/:orderId', orderController.getOrderDetails);


module.exports = router;
