// models/Screen.js
const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  screenId: { 
    type: String, 
    required: [true, 'Screen ID is required'], 
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9_-]+$/, 'Screen ID can only contain letters, numbers, hyphens and underscores']
  },
  brandId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Brand' 
  },
  currentCampaignId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign' 
  }
}, {
  timestamps: true
});

// Indexes for better performance
screenSchema.index({ brandId: 1 });
screenSchema.index({ currentCampaignId: 1 });

module.exports = mongoose.model('Screen', screenSchema);
