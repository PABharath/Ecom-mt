const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // Replace with your secret key

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce-mvc';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.userId; // Attach the userId to the request
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/profile', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('profile');

    // Find the user by userId attached to the request
    const user = await collection.findOne({ _id: ObjectID(req.userId) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://127.0.0.1:${PORT}`);
});
