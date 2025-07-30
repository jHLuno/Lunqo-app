const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Screen = require('../models/Screen');
const mongoose = require('mongoose');

// Get brand campaigns
router.get('/:brandId/campaigns', async (req, res) => {
  try {
    const { brandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    const campaigns = await Campaign.find({ brandId }).sort({ createdAt: -1 });
    res.json({ campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to load campaigns' });
  }
});

// Get brand screens
router.get('/:brandId/screens', async (req, res) => {
  try {
    const { brandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    const screens = await Screen.find({ brandId }).sort({ createdAt: -1 });
    res.json({ screens });
  } catch (error) {
    console.error('Error fetching screens:', error);
    res.status(500).json({ error: 'Failed to load screens' });
  }
});

module.exports = router;