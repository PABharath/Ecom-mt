const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Cart Schema and Model
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model('Cart', cartSchema);

// API endpoint to add products to the cart
app.post('/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the cart item already exists
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ userId, productId, quantity });
    }

    await cartItem.save();

    res.status(200).json({ message: 'Product added to cart.' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

// API endpoint to fetch the user's cart
app.get('/cart/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const cartItems = await Cart.find({ userId }).populate('productId');

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart items.' });
  }
});

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
