const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// MongoDB setup
const uri = 'mongodb://127.0.0.1:27017'; 
const dbName = 'Ecommerce';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

// API endpoint to insert product data into MongoDB
app.post('/insert', upload.single('productImage'), async (req, res) => {

});

// API endpoint to fetch all product data from MongoDB
app.get('/products', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    // Fetch all products
    const products = await collection.find().toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => {
  console.log('Backend server is running on http://127.0.0.1:5000');
});