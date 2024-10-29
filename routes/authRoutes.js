const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

// Get current user's profile (requires authentication)
router.get('/profile', require('../middleware/authMiddleware'), authController.getProfile);

module.exports = router;
