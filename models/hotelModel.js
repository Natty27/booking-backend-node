const mongoose = require('mongoose');
const userModel = require('./userModel');

// Define the bed type schema
const bedTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: String, required: true },
  capacity: { type: String, required: true },
  available: { type: Boolean, default: false },
});

// Define the hotel schema
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  kebele: { type: String, required: true },
  breakfastIncluded: { type: String, default: 'yes' },
  bedTypes: [bedTypeSchema],  // An array of bed types
  amenities: {
    spa: { type: Boolean, default: false },
    swimmingPool: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    gym: { type: Boolean, default: false },
  },
  contact: { type: String, required: true },
  longitude: { type: String },
  latitude: { type: String },
  star: { type: String, required: true },
  profileImage: { type: String },  // URL or path for the profile image
  galleryImages: [{ type: String }], // Array of URLs or paths for gallery images
  createdAt: { type: Date, default: Date.now },
});

// Compile model from schema
module.exports = mongoose.model('Hotel', hotelSchema);
