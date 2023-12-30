// searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route for searching products
router.get('', searchController.liveSearch);

module.exports = router;
