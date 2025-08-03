const express = require('express');
const router = express.Router();
const Stat = require('../models/Stat');
const mongoose = require('mongoose');

// Get today's reach/impressions count
router.get('/reach/today', async (req, res) => {
  try {
    // Get today's date range (start of day to end of day)
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    // Count impressions for today
    const todayImpressions = await Stat.countDocuments({
      event: 'impression',
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    res.json({ 
      count: todayImpressions,
      date: today.toISOString().split('T')[0]
    });
  } catch (error) {
    console.error('Reach stats error:', error);
    res.status(500).json({ error: 'Failed to fetch reach stats' });
  }
});

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
