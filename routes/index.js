const express = require('express');
const authRoutes = require('./authRoutes');
const hotelRoutes = require('./hotelRoutes');
const orderRoutes = require('./orderRoutes');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Data routes (protected)
router.use('/hotel', hotelRoutes);

router.use('/order', orderRoutes);

router.use('/comment', commentRoutes);

module.exports = router;
