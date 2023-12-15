// controllers/orderController.js

const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, products } = req.body;

    const order = new Order({
      totalAmount,
      products,
    });

    const savedOrder = await order.save();

    res.json({ order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
