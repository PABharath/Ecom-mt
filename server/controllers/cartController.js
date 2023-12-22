// controllers/cartController.js
const User = require('../models/userModel');

exports.getCartItems = async (req, res) => {
  try {
    // Fetch the user's cart items based on the user ID from the request headers
    const userId = req.user.id; // Assuming you use authentication middleware to attach user information to the request
    const user = await User.findById(userId).populate('cart.product');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: { cart: user.cart } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
