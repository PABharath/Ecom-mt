// searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route for searching products
router.get('/products/:query', searchController.liveSearch);

module.exports = router;
