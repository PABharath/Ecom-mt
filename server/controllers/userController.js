// controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const SALT_ROUNDS = 10;

exports.registerUser = async (req, res) => {
  const { username, email, contact, address, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      contact,
      address,
      password: hashedPassword,
    });

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to register." });
  }
};

// New function to save user address
exports.saveUserAddress = async (req, res) => {
  const customerId = req.params.id; // Correctly access customerId
  const { addressData } = req.body;

  try {
    const customer = await User.findOne({ email: customerId }); // Use "email" to find the customer
    if (!customer) {
      console.log("Customer not found for email:", customerId);
      return res.status(404).json({ error: "Customer not found." });
    }

    // Add the new address to the user's addresses
    customer.addresses.push(addressData);

    // Save the updated customer document
    await customer.save();

    console.log("Address added successfully:", addressData);

    res.status(201).json({ addressData });
  } catch (error) {
    console.error("Error saving address data:", error.message);
    console.log("customerId:", customerId);
    res.status(500).json({ error: "Error saving address data." });
  }
};

// Update the getUserProfile function to fetch user addresses
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the "users" collection and populate additional data
    const user = await User.findById(userId)
    .populate('cart.productName', 'productName sp quantity') 
      .populate('wishlist', 'productName')
      .populate('reviews', 'comment')
      .select('-password') // Exclude password from the response
      .populate('address') // Populate user addresses


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// New function to add a product to the user's cart
exports.addToCart = async (req, res) => {
  const customerId = req.params.id; // Correctly access customerId
  const { cartItems } = req.body;

  try {
    const customer = await User.findOne({ email: customerId }); // Use "email" to find the customer
    if (!customer) {
      console.log("Customer not found for email:", customerId);
      return res.status(404).json({ error: "Customer not found." });
    }

    // Clear the existing cart and add the new cart items
    customer.cart = cartItems;

    // Save the updated customer document
    await customer.save();

    console.log("Product added to cart successfully:", cartItems);

    res.status(201).json({ cartItems });
  } catch (error) {
    console.error("Error saving product data:", error.message);
    console.log("customerId:", customerId);
    res.status(500).json({ error: "Error saving product data." });
  }
};

// New function to add a product to the user's wishlist
exports.addToWishlist = async (req, res) => {
  const customerId = req.params.id; // Correctly access customerId
  const { wishlistItem } = req.body;

  try {
    const customer = await User.findOne({ email: customerId }); // Use "email" to find the customer
    if (!customer) {
      console.log("Customer not found for email:", customerId);
      return res.status(404).json({ error: "Customer not found." });
    }

    // Add the new wishlist item
    customer.wishlist.push(wishlistItem);

    // Save the updated customer document
    await customer.save();

    console.log("Product added to wishlist successfully:", wishlistItem);

    res.status(201).json({ wishlistItem });
  } catch (error) {
    console.error("Error saving wishlist item data:", error.message);
    console.log("customerId:", customerId);
    res.status(500).json({ error: "Error saving wishlist item data." });
  }
};
exports.addAddress = async (req, res) => {
  const customerId = req.params.id; // Correctly access customerId
  const appointmentData = req.body;
  console.log(req.params.id);
  try {
    const customer = await User.findOne({ email: customerId }); // Use "_id" to find the customer
    if (!customer) {
      console.log("Customer not found for _id:", customerId);
      return res.status(404).json({ error: "Customer not found." });
    }

    // Add the new appointment to the customer's appointments array
    customer.address.push(appointmentData);

    // Save the updated customer document
    await customer.save();

    console.log("Appointment data saved successfully:", appointmentData);

    res.status(201).json(appointmentData);
  } catch (error) {
    console.error("Error saving appointment data:", error.message);
    console.log("customerId:", customerId);
    res.status(500).json({ error: "Error saving appointment data." });
  }
};
