const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PaymentSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
});

const Payment = mongoose.model("Payment", PaymentSchema);

const razorpay = new Razorpay({
  key_id: "rzp_test_7ffWepXdK0WViE",
  key_secret: "Wo5E8UZyqCuGvnnin5TOvSzI",
});

router.post("/create-order", async (req, res) => {
  const { totalAmount } = req.body;

  const options = {
    amount: totalAmount * 1,
    currency: "INR",
  };

  try {
    const order = await razorpay.orders.create(options);

    const payment = new Payment({
      orderId: order.id,
      amount: totalAmount,
    });
    await payment.save();

    res.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

router.get("/get-payment-pref/:order_id", async (req, res) => {
  const { order_id } = req.params;

  try {
    const encodedOrderID = encodeURIComponent(order_id);
    const response = await razorpay.orders.fetch(encodedOrderID);
    console.log("Razorpay API response:", response); // Log the response
    res.json({ preferences: response });
  } catch (error) {
    console.error("Error fetching payment preferences:", error);
    res.status(500).json({ error: "Error fetching payment preferences" });
  }
});



app.use(express.json());
app.use("/api", router);

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
