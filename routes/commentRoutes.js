const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

// Register a new user
router.post('/', commentController.createComment);

// Login a user
router.get('/',   commentController.getComments);

// Get current user's profile (requires authentication)
router.get('/:id',  commentController.getCommentById);
router.patch('/:id',  commentController.updateComment);
router.delete('/:id',  commentController.deleteComment);

module.exports = router;
