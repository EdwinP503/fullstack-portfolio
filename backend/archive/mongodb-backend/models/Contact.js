const mongoose = require('mongoose');

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required.'],
    maxlength: [500, 'Message cannot exceed 500 characters.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model('Contact', ContactSchema);
