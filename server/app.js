const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const addProductRoutes = require("./routes/addProductRoutes");
const addressRoutes = require("./routes/addressRoutes");
const forgotRoutes = require("./routes/forgotRoutes");
const contactRoutes = require("./routes/contactRoutes");
const emailRoutes = require("./routes/emailRoutes");
const searchRoutes = require("./routes/searchRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const loginRoutes = require("./routes/loginRoutes");
 const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI =
  "mongodb+srv://lkasireddy915:1234@e-commerce.o3n1dk4.mongodb.net/Ecommerce?retryWrites=true&w=majority";
// const dbName = 'Ecommerce-mvc';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve uploaded images
app.use("/api/uploads", express.static("uploads"));
// Use the search route
app.use("/api", searchRoutes);
// Use the auth routes
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
// Use the product routes
app.use("/api", productRoutes);

// Use the add product routes
app.use("/api", addProductRoutes);

// Use the address routes
app.use("/api/address", addressRoutes);

// Use the forgot password routes
app.use("/api", forgotRoutes);

// use the Contact us
app.use("/contact", contactRoutes);

// use the mail
app.use("/login", emailRoutes);

app.use("/api", reviewsRoutes);

// Example of a default route
app.get("/", (req, res) => {
  res.send("Hello, this is the default route!");
});

// Use the payment routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

// Use order routes
app.use("/api", orderRoutes);

// Use the cart routes
app.use("/api/profile", cartRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
