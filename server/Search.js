// server.js

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5555;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

const searchProducts = async (query) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    // Use the $text operator for a text search on all fields
    const searchResults = await collection.find({ $text: { $search: query } }).toArray();

    return searchResults;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Internal server error');
  }
};

app.get('/api/search', async (req, res) => {
  const query = req.query.query;

  try {
    const searchResults = await searchProducts(query);
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
