// searchRoutes.js
const express = require('express');
const { searchProducts } = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchProducts);  // Check if this route is correct

module.exports = router;
