const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  products: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  expectedDeliveryDate: { type: Date },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
