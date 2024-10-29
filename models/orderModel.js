const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Assuming there's a separate Hotel model
    required: true
  },
  orderCode: {
    type: String,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  bedType: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  bedPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'cancelled', 'completed']
  },
  userDetails: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming there's a separate Hotel model
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    kebele: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);
