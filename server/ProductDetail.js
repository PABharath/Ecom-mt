const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');
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
const dbName = 'Ecommerce-mvc';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

// API endpoint to insert product data into MongoDB
app.post('/insert', upload.single('productImage'), async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    const {
      productName,
      productDescription,
      // ... (other fields)
    } = req.body;

    const productImages = req.file ? [req.file.filename] : [];

    const placeholderImages = [
      'placeholder-image-1.jpg',
      'placeholder-image-2.jpg',
      'placeholder-image-3.jpg',
    ];

    // Insert a product document
    const result = await collection.insertOne({
      productName,
      productImages: [...productImages, ...placeholderImages],
      productDescription,
      // ... (other fields)
    });

    res.status(201).json({ message: 'Product added successfully.' });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ error: 'Failed to add product.' });
  }
});

// API endpoint to fetch a specific product by its productId
app.get('/products/:productId', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    const { productId } = req.params;

    // Use the 'new' keyword when creating an instance of ObjectId
    const objectId = new ObjectId(productId);

    // Fetch the product based on productId
    const product = await collection.findOne({ _id: objectId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5001, () => {
  console.log('Backend server is running on http://127.0.0.1:5001');
});
