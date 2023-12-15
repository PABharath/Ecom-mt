// models/orderModel.js
// models/orderModel.js
const mongoose = require('mongoose');

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
  products: [productSchema],
});

orderSchema.pre('save', async function (next) {
  // Your pre-save middleware logic here
  next();
});

orderSchema.virtual('formattedOrderDate').get(function () {
  return this.orderDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
});

orderSchema.virtual('formattedExpectedDeliveryDate').get(function () {
  return this.expectedDeliveryDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
