const express = require('express');
const {
  getRazorpayKey,
  checkout,
  paymentVerification,
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/getkey', getRazorpayKey);
router.post('/checkout', checkout);
router.post('/paymentverification', paymentVerification);

module.exports = router;
