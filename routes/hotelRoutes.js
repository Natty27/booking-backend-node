const express = require('express');
const multer = require('multer');
const hotelController = require('../controller/hotelController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File type and size validation
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Routes
router.post(
  '/', 
  authMiddleware, 
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 10 },
  ]), 
  hotelController.createHotel
);

router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotelById);
router.patch(
  '/:id', 
  authMiddleware, 
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 10 },
  ]), 
  hotelController.updateHotel
);
router.delete('/:id', authMiddleware, hotelController.deleteHotel);

module.exports = router;
