// controllers/cartController.js
const User = require('../models/userModel');

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
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

exports.incrementCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItem = user.cart.find(item => item.product == productId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity += 1;
    await user.save();

    res.status(200).json({ message: 'CartItem incremented successfully', user: { cart: user.cart } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.decrementCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedCart = user.cart.map((item) => {
      if (item.product == productId) {
        if (item.quantity > 1) {
          // Reduce quantity by 1
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Do nothing when quantity is 1 (or you can handle differently)
          return item;
        }
      }
      return item;
    }).filter(Boolean); // Remove null values from the array

    user.cart = updatedCart;
    await user.save();

    res.status(200).json({ message: 'CartItem decremented successfully', user: { cart: updatedCart } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the item from the cart
    const updatedCart = user.cart.filter(item => item.product != productId);
    user.cart = updatedCart;
    await user.save();

    res.status(200).json({ message: 'CartItem deleted successfully', user: { cart: updatedCart } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

