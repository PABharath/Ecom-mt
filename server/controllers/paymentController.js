const mongoose = require('mongoose');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel');

const instance = new Razorpay({
  key_id: 'rzp_test_7ffWepXdK0WViE',
  key_secret: 'Wo5E8UZyqCuGvnnin5TOvSzI',
});

exports.getRazorpayKey = (req, res) => {
  res.status(200).json({ key: 'rzp_test_7ffWepXdK0WViE' });
};

exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: 'INR',
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', 'Wo5E8UZyqCuGvnnin5TOvSzI')
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
