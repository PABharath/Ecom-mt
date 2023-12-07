const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const app = express();
const SALT_ROUNDS = 10;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

app.post('/register', async (req, res) => {
  const { username, email, contact, address, password } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('Register');

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert a document with hashed password
    const result = await collection.insertOne({ username, email, contact, address, password: hashedPassword });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to register.' });
  }
});

app.listen(5020, () => {
  console.log('Backend server is running on http://localhost:5020');
});
