import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";
import cors from "cors";

const app = express();

// Connect to the database
const connectDB = async () => {
  const { connection } = await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce-mvc");
  console.log(`Mongodb is connected with ${connection.host}`);
};
connectDB();

// Create a Razorpay instance
const instance = new Razorpay({
  key_id: "rzp_test_7ffWepXdK0WViE",
  key_secret: "Wo5E8UZyqCuGvnnin5TOvSzI",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Payment Model
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

// Routes
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: "rzp_test_7ffWepXdK0WViE" })
);

app.post("/api/checkout", async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

app.post("/api/paymentverification", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "Wo5E8UZyqCuGvnnin5TOvSzI")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is working on ${PORT}`));
