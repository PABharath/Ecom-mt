// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
  },
  contact: String,
  password: String,
  resetToken: String,
  resetTokenExpiration: Date,
  // Additional user-related data
  cart: [{ 
     productName:String ,
     quantity: Number ,
     sp: Number,
     productImages: [String],
    }],  
  wishlist: [{ 
    productName:String ,
    
    sp: Number,
    productImages: [String],  

   }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  address: [{ 
    fullName: String,
    mobileNumber: String,
    addressLine: String,
    area: String,
    town: String,
    state: String,
    country: String,
    pincode: String,
    isDefaultAddress: Boolean, 
   }], 
   orders: [{ 
    orderId: { type: String, required: true, unique: true },
    orderDate: { type: Date, default: Date.now },
    products: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    expectedDeliveryDate: { type: Date },
   }] 

});

const User = mongoose.model("User", userSchema);
module.exports = User;
