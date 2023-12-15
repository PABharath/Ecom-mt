// models/orderModel.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  expectedDeliveryDate: {
    type: Date,
  },
  products: [productSchema], // Array of products in the order
  // Add other fields as needed
});

// Middleware to generate unique orderId and set dates before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear().toString().slice(-2) +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      currentDate.getDate().toString().padStart(2, "0");

    const generatedOrderId = `OrderId${formattedDate}${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    
    // Ensure that the generated orderId is unique
    const existingOrder = await this.constructor.findOne({ orderId: generatedOrderId });
    if (existingOrder) {
      // If not unique, regenerate the orderId
      return this.pre("save", next);
    }

    this.orderId = generatedOrderId;
  }

  // Set the expected delivery date to 7 days from the order date
  const deliveryDate = new Date(this.orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  this.expectedDeliveryDate = deliveryDate;

  next();
});

// Virtuals for formatted dates
orderSchema.virtual("formattedOrderDate").get(function () {
  return this.orderDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

orderSchema.virtual("formattedExpectedDeliveryDate").get(function () {
  return this.expectedDeliveryDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
