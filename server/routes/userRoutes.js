// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Endpoint for user registration
router.post('/register', userController.registerUser);

router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;