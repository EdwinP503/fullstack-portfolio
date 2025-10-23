const express = require('express');
const router = express.Router();
const { getContactSubmissions, submitContactForm } = require('../../controllers/contactController');

// @route   GET /api/contact/submissions
// @desc    Retrieve all contact form submissions
// @access  Public
router.get('/submissions', getContactSubmissions);

// @route   POST /api/contact/submit
// @desc    Submit a new contact form
// @access  Public
router.post('/submit', submitContactForm);

module.exports = router;
