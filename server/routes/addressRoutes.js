// routes/addressRoutes.js
const express = require('express');
const addressController = require('../controllers/addressController');

const router = express.Router();

router.post('/insert', addressController.addAddress);
router.get('/addresses', addressController.getAddresses);

module.exports = router;
