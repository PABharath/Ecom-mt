const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


app.use(cors());
app.use(express.json()); 


mongoose.connect('mongodb://localhost:27017/Bala', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const emailSchema = new mongoose.Schema({ 
  Email:String,
 });

const email = mongoose.model('email', emailSchema);

app.post('/insert', async (req, res) => {
  const {Email } = req.body;

  try {
    const email = new email({
      Email,
      
    });



    await email.save();
    console.log('Successfully logged in', email._id);

    res.status(201).json({ message: 'Login successfully.' });
  } catch (error) {
    console.error('Not logged in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});




app.listen(2, () => {
  console.log('Backend server is running on http://localhost:5555');
});