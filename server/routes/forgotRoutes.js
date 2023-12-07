// routes/forgotRoutes.js
const express = require('express');
const ForgotController = require('../controllers/ForgotController');

const router = express.Router();

router.post('/forgot', ForgotController.forgotPassword);
router.post('/verify-otp', ForgotController.verifyResetToken);

module.exports = router;
