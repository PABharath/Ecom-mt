
// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/users/:id/orders/create", orderController.createOrder);

// Fetch all orders
router.get("/", orderController.getOrders);


module.exports = router;
