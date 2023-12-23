// models/addProduct.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  category:[String],
  productImages: [String],
  productDescription: String,
  occasion: String,
  primaryColor: String,
  material: String,
  borderType: String,
  colorFamily: String,
  fabric: String,
  secondaryColor: String,
  pattern: String,
  borderSize: String,
  type: String,
  // review: String,
  // starRating: Number,
  mrp: Number,
  sp: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
