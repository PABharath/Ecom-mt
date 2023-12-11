const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Import productRoutes
const addProductRoutes = require('./routes/addProductRoutes');
const addressRoutes = require('./routes/addressRoutes');
const forgotRoutes = require('./routes/forgotRoutes');
const contactRoutes = require('./routes/contactRoutes');
const emailRoutes = require('./routes/emailRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Ecommerce-mvc';

mongoose.connect(`${uri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  

// Serve uploaded images
app.use('/api/uploads', express.static('uploads'));
app.use('/api/search', searchRoutes);

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Use the product routes
app.use('/api', productRoutes);

// Use the add product routes
app.use('/api', addProductRoutes);

// Use the address routes
app.use('/api', addressRoutes);

// Use the forgot password routes
app.use('/api', forgotRoutes);

// use the Contact us
app.use('/contact', contactRoutes);

// use the mail
app.use('/login', emailRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
