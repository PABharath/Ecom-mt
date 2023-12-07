const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient } = require("mongodb");
const app = express();

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());
app.use(express.json());

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// MongoDB setup
const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB connection string
const dbName = "Ecommerce";

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

// API endpoint to insert product data into MongoDB
app.post("/products", upload.array("productImages"), async (req, res) => {
  const {
    productName,
    productDescription,
    occasion,
    primaryColor,
    material,
    borderType,
    colorFamily,
    fabric,
    secondaryColor,
    pattern,
    borderSize,
    type,
    review,
    starRating,
    mrp,
    sp,
  } = req.body;

  const productImages = req.files.map((file) => file.filename);

  const placeholderImages = [
    "placeholder-image-1.jpg",
    "placeholder-image-2.jpg",
    "placeholder-image-3.jpg",
  ];

  // Remove the placeholders from the array before inserting
  const imagesToInsert = productImages.filter(
    (image) => !placeholderImages.includes(image)
  );

  try {
    const db = await connectToDatabase();
    const collection = db.collection("products");

    // Insert a product document
    const result = await collection.insertOne({
      productName,
      productImages: imagesToInsert,
      productDescription,
      occasion,
      primaryColor,
      material,
      borderType,
      colorFamily,
      fabric,
      secondaryColor,
      pattern,
      borderSize,
      type,
      review,
      starRating: parseInt(starRating),
      mrp: parseFloat(mrp),
      sp: parseFloat(sp),
    });
    console.log("Product inserted:", result.insertedId);

    res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ error: "Failed to add product." });
  }
});

app.listen(5006, () => {
  console.log("Backend server is running on http://localhost:5006");
});
