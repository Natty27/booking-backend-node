const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  const { email, name, password, city, kebele, phoneNumber, role , hotel} = req.body;
  
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create and save new user
    const newUser = new User({ email, name, password, city, kebele, phoneNumber, role, hotel });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // Return user details along with token
    res.status(201).json({ 
      message: 'User registered successfully', 
      token, 
      user: { _id: newUser._id, email: newUser.email, name: newUser.name, city: newUser.city, kebele: newUser.kebele, phoneNumber: newUser.phoneNumber, role: newUser.role, hotel: newUser.hotel } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Build user object conditionally including the hotel field if it exists
    const userData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      city: user.city,
      kebele: user.kebele,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    // Add hotel only if it exists
    if (user.hotel) {
      userData.hotel = user.hotel;
    }

    // Return response
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: userData 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


// Get user profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile fetched successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};
