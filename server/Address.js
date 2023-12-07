const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());

// MongoDB setup
const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB connection string
const dbName = "Ecommerce";

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

// API endpoint to fetch data from MongoDB
app.get("/data", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("address");

    // Fetch all documents from the collection
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

app.listen(5005, () => {
  console.log("Backend server is running on http://localhost:5005");
});
