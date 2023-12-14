  const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  productId: String,
  starRating: Number,
  username: String,
  comment: String,
  likes: { type: Number, default: 0 }, // Add likes field with default value 0
  dislikes: { type: Number, default: 0 }, // Add dislikes field with default value 0
});

const Review = mongoose.model('Review', reviewSchema);

app.get('/reviews', async (req, res) => {
  try {
    const productId = req.query.productId; // Get the productId from the query parameter
    const filteredReviews = await Review.find({ productId }); // Fetch reviews based on the productId
    res.json(filteredReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/reviews', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/reviews/:reviewId/:action', async (req, res) => {
  const { reviewId, action } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (action === 'like') {
      review.likes += 1;
    } else if (action === 'dislike') {
      review.dislikes += 1;
    }

    await review.save();

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5035;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
