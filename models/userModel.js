const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, },
  password: { type: String, required: true },
  city: { type: String, required: true, },
  kebele: { type: String, required: true, },
  phoneNumber: { type: String, required: true, },
  role: { type: String, required: true, default: 'user' },  // Default role is 'user'
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', // Assuming there's a separate Hotel model
    required: false
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
