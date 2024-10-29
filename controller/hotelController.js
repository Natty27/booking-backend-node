const Hotel = require('../models/hotelModel');

// Create new hotel entry
// Create new hotel entry
exports.createHotel = async (req, res) => {
  // Extracting other fields as before
  const { name, location, kebele, breakfastIncluded, contact, longitude,
    latitude, star } = req.body;

  // Extract file paths for uploaded images
  const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;
  const galleryImages = req.files['galleryImages'] ? req.files['galleryImages'].map(file => file.path) : [];

  // Parse bedTypes and amenities from JSON strings
  const bedTypes = req.body.bedTypes ? JSON.parse(req.body.bedTypes) : [];
  const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : {};

  try {
    const newHotel = new Hotel({
      name,
      location,
      kebele,
      breakfastIncluded,
      bedTypes,
      amenities,
      contact,
      longitude,
      latitude,
      star,
      
      profileImage,
      galleryImages,
    });

    await newHotel.save();
    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create hotel', error: err.message });
  }
};


// Update hotel by ID
exports.updateHotel = async (req, res) => {
  const {
    name,
    location,
    kebele,
    breakfastIncluded,
    bedTypes,
    amenities,
    contact,
    longitude,
      latitude,
      star,
    
  } = req.body;

  // Extract file paths for uploaded images
  const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;
  const galleryImages = req.files['galleryImages'] ? req.files['galleryImages'].map(file => file.path) : [];

  try {
    // Find the hotel by ID and update it with the new data
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        kebele,
        breakfastIncluded,
        bedTypes: JSON.parse(bedTypes), // Parse if necessary
        amenities: JSON.parse(amenities), // Parse if necessary
        contact,
        longitude,
      latitude,
        star,
        ...(profileImage && { profileImage }),   // Only update profileImage if a new one was uploaded
        ...(galleryImages.length && { galleryImages }),  // Only update galleryImages if new ones were uploaded
      },
      { new: true } // This option returns the updated document
    );

    // Check if the hotel exists
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update hotel', error: err.message });
  }
};

// Get all hotel entries
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ message: 'Hotels fetched successfully', hotels });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotels', error: err.message });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel fetched successfully', hotel });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hotel', error: err.message });
  }
};

// Delete hotel by ID
exports.deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel deleted successfully', hotel: deletedHotel });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete hotel', error: err.message });
  }
};
