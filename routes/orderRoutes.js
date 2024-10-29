const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// Register a new user
router.post('/', orderController.createOrder);

// Login a user
router.get('/',   orderController.getOrders);

// Get current user's profile (requires authentication)
router.get('/:id',  orderController.getOrderById);
router.patch('/:id',  orderController.updateOrder);
router.delete('/:id',  orderController.deleteOrder);

module.exports = router;
