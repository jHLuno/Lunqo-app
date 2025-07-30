// models/Brand.js
const mongoose = require('mongoose');

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

// Indexes for better performance
brandSchema.index({ name: 1 });

module.exports = mongoose.model('Brand', brandSchema);
