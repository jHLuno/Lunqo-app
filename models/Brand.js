// models/Brand.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const brandSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Brand name is required'],
    trim: true,
    maxlength: [100, 'Brand name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  campaigns: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign' 
  }]
}, {
  timestamps: true
});

// Hash password before saving
brandSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with salt rounds of 12
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
brandSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes for better performance
brandSchema.index({ name: 1 });

module.exports = mongoose.model('Brand', brandSchema);
