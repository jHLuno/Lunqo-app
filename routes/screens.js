// routes/screens.js
const express = require('express');
const router = express.Router();
const Screen = require('../models/Screen');
const Campaign = require('../models/Campaign');
const mongoose = require('mongoose');
const { authAdmin } = require('../middleware/authMiddleware');

// Get screen playlist
router.get('/:id/playlist', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Screen ID is required' });
    }

    const screen = await Screen.findOne({ screenId: id }).populate('currentCampaignId');

    if (!screen) {
      return res.status(404).json({ error: 'Screen not found' });
    }

    if (!screen.currentCampaignId) {
      return res.status(404).json({ error: 'No campaign assigned to this screen' });
    }

    const campaign = await Campaign.findById(screen.currentCampaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({
      campaignName: campaign.name,
      videos: campaign.videos,
      campaignId: campaign._id,
      brandId: campaign.brandId
    });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

// Get single screen
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid screen ID format' });
    }

    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ error: 'Screen not found' });
    }

    res.json(screen);
  } catch (error) {
    console.error('Error fetching screen:', error);
    res.status(500).json({ error: 'Failed to fetch screen' });
  }
});

// Delete screen
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid screen ID format' });
    }

    const screen = await Screen.findByIdAndDelete(id);
    if (!screen) {
      return res.status(404).json({ error: 'Screen not found' });
    }

    res.json({ message: 'Screen deleted successfully' });
  } catch (error) {
    console.error('Error deleting screen:', error);
    res.status(500).json({ error: 'Failed to delete screen' });
  }
});

// Assign campaign to screen
router.patch('/assign-campaign', authAdmin, async (req, res) => {
  try {
    const { screenId, campaignId } = req.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log('Assignment request:', { screenId, campaignId });
    }

    if (!screenId || !campaignId) {
      return res.status(400).json({ error: 'Screen ID and campaign ID are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ error: 'Invalid campaign ID format' });
    }

    const screen = await Screen.findOne({ screenId });
    if (process.env.NODE_ENV !== 'production') {
      console.log('Found screen:', screen);
    }
    
    if (!screen) {
      return res.status(404).json({ error: 'Screen not found' });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    screen.currentCampaignId = campaignId;
    screen.brandId = campaign.brandId; // Ensure screen's brandId matches the campaign's brandId
    await screen.save();

    res.json({ 
      message: 'Campaign assigned to screen successfully', 
      screen 
    });
  } catch (error) {
    console.error('Error assigning campaign:', error);
    res.status(500).json({ error: 'Failed to assign campaign' });
  }
});

module.exports = router;
