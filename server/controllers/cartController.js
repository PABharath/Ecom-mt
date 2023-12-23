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

    const cartItem = user.cart.find(item => item.product == productId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await user.save();
      res.status(200).json({ message: 'CartItem decremented successfully', user: { cart: user.cart } });
    } else {
      // Remove the item from the cart if quantity becomes 0
      user.cart = user.cart.filter(item => item.product != productId);
      await user.save();
      res.status(200).json({ message: 'CartItem removed successfully', user: { cart: user.cart } });
    }
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
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Remove the item from the cart if quantity becomes 0
          return null;
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

