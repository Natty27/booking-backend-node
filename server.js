const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors()); // Allow all origins by default
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/', routes); // Use the imported routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
