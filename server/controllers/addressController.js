// controllers/addressController.js
const User = require('../models/userModel');

const addAddress = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAddress = async (req, res) => {
  const  userId = req.params.userId;
  const  addressId= req.params.addressId
  try {
    // Find the user by ID
    const user = await User.findOne({email:userId});

    if (!user) {
      // If the user with the given ID was not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the address within the user's addresses
    const addressIndex = user.address.findIndex((addr) => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      // If the address with the given ID was not found within the user's addresses
      return res.status(404).json({ error: 'Address not found' });
    }

    // Remove the address from the user's addresses array
    user.address.splice(addressIndex, 1);

    // Save the updated user data
    await user.save();

    // If the address was successfully deleted
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addAddress, getAddresses, deleteAddress };
