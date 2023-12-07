// models/addressModel.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  addressLine: String,
  area: String,
  town: String,
  state: String,
  country: String,
  pincode: String,
  isDefaultAddress: Boolean,
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
