const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
  const { Firstname, Lastname, Email, Mobile, Message } = req.body;

  try {
    const newContact = new Contact({
      Firstname,
      Lastname,
      Email,
      Mobile,
      Message,
    });

    await newContact.save();
    console.log('Successfully saved contact:', newContact._id);

    res.status(201).json({ message: 'Contact information saved successfully.' });
  } catch (error) {
    console.error('Failed to save contact:', error);
    res.status(500).json({ error: 'Failed to save contact information.' });
  }
};

module.exports = {
  createContact,
};
