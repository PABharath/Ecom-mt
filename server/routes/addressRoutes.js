// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/add', addressController.addAddress);
router.get('/get', addressController.getAddresses);
router.delete('/:userId/:addressId', addressController.deleteAddress);

module.exports = router;
