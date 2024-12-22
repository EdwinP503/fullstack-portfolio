const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./routes/contactRoutes');

// Initialize environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure HTTP headers

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend server is running.',
  });
});

// API routes
app.use('/api/contact', contactRoutes);

// MongoDB connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for testing purposes
module.exports = app;
