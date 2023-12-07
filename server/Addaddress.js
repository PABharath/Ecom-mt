const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());
app.use(express.json());

// MongoDB setup
const uri = "mongodb://127.0.0.1:27017";
const dbName = "Ecommerce";

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

// API endpoint to insert data into MongoDB
app.post("/insert", async (req, res) => {
  const {
    fullName,
    mobileNumber,
    addressLine,
    area,
    town,
    state,
    country,
    pincode,
    isDefaultAddress
  } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("address");

    // Insert a document
    const result = await collection.insertOne({
      fullName,
      mobileNumber,
      addressLine,
      area,
      town,
      state,
      country,
      pincode,
      isDefaultAddress
    });
    console.log("Document inserted:", result.insertedId);

    res.status(201).json({ message: "Data inserted successfully." });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data." });
  }
});

app.listen(5004, () => {
  console.log("Backend server is running on http://localhost:5004");
});
