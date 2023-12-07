// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Endpoint for user login
router.post('/login', authController.loginUser);

module.exports = router;
