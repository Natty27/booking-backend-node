const Comment = require('../models/commentModel');

// Create a new comment
// Create new comment
exports.createComment = async (req, res) => {
  // Destructure userDetails from req.body
  const {
    hotel: hotel,
    user : user,
    comment,
  } = req.body;

  

  try {
    const newComment = new Comment({
      hotel: hotel,
      user: user,
      comment,
      
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comment', error: err.message });
  }
};


// Update an existing comment by ID
// Update an existing comment by ID
exports.updateComment = async (req, res) => {
  const {
    hotel,
    user,
    comment,
  } = req.body;

  // Parse duration and bedPrice to numbers
  const parsedDuration = parseInt(duration, 10);
  const parsedBedPrice = parseFloat(bedPrice);

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        hotel,
        user,
        comment
      },
      { new: true, runValidators: true } // Added runValidators to ensure validation on update
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comment', error: err.message });
  }
};


// Get all comments
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('hotel') // Populate the hotel field
      .populate('user'); // Populate the user field

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get a single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('hotel').populate('user');
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an comment by ID
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully', comment: deletedComment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
};
