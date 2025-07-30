const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  screenId: { 
    type: String, 
    required: [true, 'Screen ID is required'],
    trim: true
  },
  brandId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Brand', 
    required: [true, 'Brand ID is required'] 
  },
  campaignId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campaign', 
    required: [true, 'Campaign ID is required'] 
  },
  event: { 
    type: String, 
    enum: {
      values: ['impression', 'click'],
      message: 'Event must be either "impression" or "click"'
    }, 
    required: [true, 'Event type is required'] 
  },
  trackingId: {
    type: String,
    trim: true
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Indexes for better performance
statSchema.index({ screenId: 1, timestamp: -1 });
statSchema.index({ brandId: 1, timestamp: -1 });
statSchema.index({ campaignId: 1, timestamp: -1 });
statSchema.index({ event: 1, timestamp: -1 });
statSchema.index({ trackingId: 1 });

module.exports = mongoose.model('Stat', statSchema);
