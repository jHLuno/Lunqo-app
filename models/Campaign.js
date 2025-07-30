// models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Campaign name is required'],
    trim: true,
    maxlength: [200, 'Campaign name cannot exceed 200 characters']
  },
  brandId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Brand', 
    required: [true, 'Brand ID is required'] 
  },
  startDate: { 
    type: Date,
    validate: {
      validator: function(value) {
        return !this.endDate || value <= this.endDate;
      },
      message: 'Start date must be before or equal to end date'
    }
  },
  endDate: { 
    type: Date,
    validate: {
      validator: function(value) {
        return !this.startDate || value >= this.startDate;
      },
      message: 'End date must be after or equal to start date'
    }
  },
  videos: [{ 
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(mp4|webm|ogg)$/i.test(v);
      },
      message: 'Video URL must be a valid video file URL'
    }
  }],
  promoUrl: { 
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Promo URL must be a valid URL'
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
campaignSchema.index({ brandId: 1 });
campaignSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Campaign', campaignSchema);
