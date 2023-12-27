// controllers/orderController.js

const User = require('../models/userModel');

// Create order

// Create order
exports.createOrder = async (req, res) => {
  const userId = req.params.id
  try {
    const { cartItems, totalAmount } = req.body;
    const customer = await User.findOne({ email: userId })
    // Generate a 5-digit orderId
    console.log('After finding user', customer);
    const orderId = generateOrderId();

    // Calculate expected delivery date (11 days from orderDate)
    const orderDate = new Date();
    const expectedDeliveryDate = new Date(orderDate);
    expectedDeliveryDate.setDate(orderDate.getDate() + 10); // Adding 10 days

    const newOrder = {
      orderId,
      products: cartItems,
      totalAmount,
      orderDate,
      expectedDeliveryDate,
    };

    // Add the new order to the user's orders array
    customer.orders.push(newOrder);

    // Save the updated user document
    await customer.save();

    res.json({ order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

generateOrderId = () => {
  // Generate a 5-digit serial incremental orderId
  const randomSerial = Math.floor(10000 + Math.random() * 90000);
  return `ODR${randomSerial}`;
};

// Fetch all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await User.find().sort({ orderDate: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

