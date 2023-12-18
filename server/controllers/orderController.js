const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;

    // Generate a 5-digit orderId
    const orderId = generateOrderId();

    // Calculate expected delivery date (10 days from now)
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 10);

    const newOrder = new Order({
      orderId,
      products: cartItems,
      totalAmount,
      expectedDeliveryDate,
    });

    const savedOrder = await newOrder.save();

    res.json({ order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateOrderId = () => {
  // Generate a 5-digit serial incremental orderId
  const randomSerial = Math.floor(10000 + Math.random() * 90000);
  return `ODR${randomSerial}`;
};

// Fetch all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createOrder, getOrders };