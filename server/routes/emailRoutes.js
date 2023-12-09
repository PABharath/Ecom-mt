const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

router.post('/nodemail', sendEmail);

module.exports = router;
