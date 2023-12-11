const Email = require('../models/emailModel');

exports.insertEmail = async (req, res) => {
  const { Email: userEmail } = req.body;

  try {
    const newEmail = new Email({ Email: userEmail });
    await newEmail.save();
    console.log('Successfully logged in', newEmail._id);

    res.status(201).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Not logged in', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

