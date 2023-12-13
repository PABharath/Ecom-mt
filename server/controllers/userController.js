// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const SALT_ROUNDS = 10;

exports.registerUser = async (req, res) => {
  const { username, email, contact, address, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user document
    const newUser = new User({ username, email, contact, address, password: hashedPassword });

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to register.' });
  }
};

// controllers/userController.js
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the "users" collection and populate additional data
    const user = await User.findById(userId)
      .populate('cart', 'productName') // Add fields you want to populate for 'Product' documents
      .populate('wishlist', 'productName')
      .populate('reviews', 'comment');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// New function to add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Fetch the user based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product already exists in the cart
    if (!user.cart.includes(productId)) {
      // If not, add the product to the cart
      user.cart.push(productId);
      await user.save();
      return res.status(200).json({ message: 'Product added to cart successfully' });
    } else {
      // If the product already exists in the cart, you may want to handle this case accordingly
      return res.status(400).json({ error: 'Product already exists in the cart' });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};