// models/SearchModel.js
const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  productName: String,
  category:[String],
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
  // Add other fields as needed
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
