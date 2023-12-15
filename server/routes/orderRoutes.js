// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create order route
router.post("/create-order", orderController.createOrder);

module.exports = router;
