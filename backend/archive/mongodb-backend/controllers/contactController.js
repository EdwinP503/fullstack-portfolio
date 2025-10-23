const Joi = require('joi');
const validator = require('validator');
const Contact = require('../../../models/Contact');

// Controller to get all contact form submissions
const getContactSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 }); // Sort by latest submissions
    res.status(200).json({
      success: true,
      message: 'Contact submissions retrieved successfully.',
      data: contacts,
    });
  } catch (error) {
    console.error('Error retrieving contacts:', error.message);
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving contact submissions.',
    });
  }
};

// Controller to submit a new contact form
const submitContactForm = async (req, res) => {
  // Validation schema with Joi
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Name must be a string.',
      'string.min': 'Name must be at least 3 characters.',
      'string.max': 'Name must not exceed 50 characters.',
      'any.required': 'Name is required.',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address.',
      'any.required': 'Email is required.',
    }),
    message: Joi.string().min(10).max(500).required().messages({
      'string.min': 'Message must be at least 10 characters.',
      'string.max': 'Message must not exceed 500 characters.',
      'any.required': 'Message is required.',
    }),
  });

  // Validate incoming data
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error.',
      details: error.details.map((err) => err.message),
    });
  }

  const { name, email, message } = value;

  // Sanitize the data
  const sanitizedEmail = validator.normalizeEmail(email); // Normalize the email
  const sanitizedMessage = validator.escape(message); // Escape HTML from message

  try {
    const newContact = new Contact({
      name,
      email: sanitizedEmail,
      message: sanitizedMessage,
    });

    await newContact.save(); // Save sanitized contact data to the database
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: { id: newContact._id },
    });
  } catch (error) {
    console.error('Error while saving contact:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
};

module.exports = { getContactSubmissions, submitContactForm };
