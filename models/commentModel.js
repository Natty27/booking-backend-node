const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Assuming there's a separate Hotel model
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a separate Hotel model
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model('Comment', commentSchema);
