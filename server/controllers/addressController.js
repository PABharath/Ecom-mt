// controllers/addressController.js
const Address = require('../models/addressModel');

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
  
  module.exports = { addAddress, getAddresses };