const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const addProductRoutes = require('./routes/addProductRoutes');
const addressRoutes = require('./routes/addressRoutes');
const forgotRoutes = require('./routes/forgotRoutes');
const contactRoutes = require('./routes/contactRoutes');
const emailRoutes = require('./routes/emailRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/api/uploads', express.static('uploads'));
app.use('/api/search', searchRoutes);

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', loginRoutes);

// Use the product routes
app.use('/api', productRoutes);

// Use the add product routes
app.use('/api', addProductRoutes);

// Use the address routes
app.use('/api', addressRoutes);

// Use the forgot password routes
app.use('/api', forgotRoutes);

// Use the Contact us
app.use('/contact', contactRoutes);

// Use the mail
app.use('/login', emailRoutes);

app.use('/api', reviewsRoutes);

// Example of a default route
app.get('/', (req, res) => {
  res.send('Hello, this is the default route!');
});

// Use the payment routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Use order routes
app.use('/api', orderRoutes);

// Use the cart routes
app.use('/api/profile', cartRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
