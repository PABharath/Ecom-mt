const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // You'll need this library for generating JWT tokens
const app = express();

app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce';
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoidmFJbljkyOTEyNzM0fQ.XXJcsOi1ggP97jPoKAKth6v_IgJw54ba70yMOpQQR8s';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('Register');

    // Find the user by email
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

app.listen(5022, () => {
  console.log('Backend server is running on http://127.0.0.1:5022');
});
