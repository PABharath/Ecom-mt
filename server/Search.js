const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5055;
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('products');

    const searchResults = await collection
      .find({
        $or: [
          { productName: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
        ],
      })
      .toArray();

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
