const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5555;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// MongoDB connection (replace 'your_database_url' with your MongoDB URL)
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// Product schema
const productSchema = new mongoose.Schema({
  productName: String,
  // Add other fields as needed
});

const Product = mongoose.model('Product', productSchema);

// Search endpoint
app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const searchResults = await Product.find({
      productName: { $regex: new RegExp(query, 'i') },
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

