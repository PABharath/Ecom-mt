const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({ 
  Email: String,
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;

