const express = require('express');
const router = express.Router();
const Stat = require('../models/Stat');
const mongoose = require('mongoose');

// Create new stat event
router.post('/', async (req, res) => {
  try {
    const { screenId, brandId, campaignId, event, trackingId } = req.body;

    // Input validation
    if (!screenId || !brandId || !campaignId || !event) {
      return res.status(400).json({ 
        error: 'Missing required fields: screenId, brandId, campaignId, event' 
      });
    }

    // Validate event type
    if (!['impression', 'click'].includes(event)) {
      return res.status(400).json({ 
        error: 'Event must be either "impression" or "click"' 
      });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brandId format' });
    }
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ error: 'Invalid campaignId format' });
    }

    // Create stat record
    const stat = await Stat.create({ 
      screenId, 
      brandId, 
      campaignId, 
      event,
      trackingId 
    });

    res.status(201).json({ 
      message: 'Stat recorded successfully',
      stat 
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to record stat' });
  }
});

module.exports = router;
