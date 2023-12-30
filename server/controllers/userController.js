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
  const  {cartItems}  = req.body;

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
  const  wishlistItem  = req.body;

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
 // Adjust the path based on your project structure

exports.UpdateProduct = async (req, res) => {
  const customerId = req.params.id;
  const productId = req.params.productId;
  const updatedProductData = req.body;

  try {
    // Find the user by ID or email (as per your requirement)
    const user = await User.findOne({ email: customerId });

    if (!user) {
      // If the user with the given ID or email was not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the index of the product in the cart
    const productIndex = user.cart.findIndex((product) => product._id.toString() === productId);

    if (productIndex === -1) {
      // If the product with the given ID was not found in the cart
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    // Update the product in the cart
    user.cart[productIndex] = {
      ...user.cart[productIndex],
      ...updatedProductData,
    };

    // Save the updated user data
    await user.save();
    console.log("Product updated successfully:", updatedProductData);

    // If the product was successfully updated
    res.status(200).json({ message: 'Product updated successfully', user: user });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
