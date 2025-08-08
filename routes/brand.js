const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Screen = require('../models/Screen');
const Stat = require('../models/Stat');
const Brand = require('../models/Brand');
const mongoose = require('mongoose');

// Get brand info
router.get('/:brandId/info', async (req, res) => {
  try {
    // Use brandId from authentication middleware instead of URL params for security
    const brandId = req.brandId;
    const { brandId: urlBrandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    // Security check: ensure URL brand ID matches authenticated brand ID
    if (urlBrandId !== brandId) {
      return res.status(403).json({ error: 'Access denied to this brand data' });
    }

    const brand = await Brand.findById(brandId).select('name email');
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.json({
      name: brand.name,
      email: brand.email
    });
  } catch (error) {
    console.error('Error fetching brand info:', error);
    res.status(500).json({ error: 'Failed to load brand information' });
  }
});

// Get brand campaigns
router.get('/:brandId/campaigns', async (req, res) => {
  try {
    // Use brandId from authentication middleware instead of URL params for security
    const brandId = req.brandId;
    const { brandId: urlBrandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    // Security check: ensure URL brand ID matches authenticated brand ID
    if (urlBrandId !== brandId) {
      return res.status(403).json({ error: 'Access denied to this brand data' });
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
    // Use brandId from authentication middleware instead of URL params for security
    const brandId = req.brandId;
    const { brandId: urlBrandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    // Security check: ensure URL brand ID matches authenticated brand ID
    if (urlBrandId !== brandId) {
      return res.status(403).json({ error: 'Access denied to this brand data' });
    }

    const screens = await Screen.find({ brandId }).sort({ createdAt: -1 });
    res.json({ screens });
  } catch (error) {
    console.error('Error fetching screens:', error);
    res.status(500).json({ error: 'Failed to load screens' });
  }
});

// Get brand statistics summary
router.get('/:brandId/stats', async (req, res) => {
  try {
    // Use brandId from authentication middleware instead of URL params for security
    const brandId = req.brandId;
    const { brandId: urlBrandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    // Security check: ensure URL brand ID matches authenticated brand ID
    if (urlBrandId !== brandId) {
      return res.status(403).json({ error: 'Access denied to this brand data' });
    }

    const brandObjectId = new mongoose.Types.ObjectId(brandId);

    // Get overall stats for this brand
    const totalStats = await Stat.aggregate([
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign"
        }
      },
      {
        $unwind: "$campaign"
      },
      {
        $match: {
          "campaign.brandId": brandObjectId
        }
      },
      {
        $group: {
          _id: "$event",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get detailed stats by screen
    const detailedByScreen = await Stat.aggregate([
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign"
        }
      },
      {
        $unwind: "$campaign"
      },
      {
        $match: {
          "campaign.brandId": brandObjectId
        }
      },
      {
        $group: {
          _id: { screenId: "$screenId", event: "$event", campaignId: "$campaignId" },
          count: { $sum: 1 },
          campaignName: { $first: "$campaign.name" }
        }
      },
      {
        $group: {
          _id: "$_id.screenId",
          campaignName: { $first: "$campaignName" },
          events: {
            $push: { event: "$_id.event", count: "$count" }
          }
        }
      },
      {
        $project: {
          _id: 0,
          screenId: "$_id",
          campaignName: "$campaignName",
          impressions: {
            $sum: {
              $map: {
                input: "$events",
                as: "e",
                in: {
                  $cond: [ { $eq: ["$$e.event", "impression"] }, "$$e.count", 0 ]
                }
              }
            }
          },
          clicks: {
            $sum: {
              $map: {
                input: "$events",
                as: "e",
                in: {
                  $cond: [ { $eq: ["$$e.event", "click"] }, "$$e.count", 0 ]
                }
              }
            }
          }
        }
      }
    ]);

    const totalImpressions = totalStats.find(s => s._id === 'impression')?.count || 0;
    const totalClicks = totalStats.find(s => s._id === 'click')?.count || 0;
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

    res.json({
      total: {
        impressions: totalImpressions,
        clicks: totalClicks
      },
      ctr,
      detailedByScreen
    });
  } catch (error) {
    console.error('Error fetching brand stats:', error);
    res.status(500).json({ error: 'Failed to load brand statistics' });
  }
});

// Get brand statistics chart data
router.get('/:brandId/stats/chart', async (req, res) => {
  try {
    // Use brandId from authentication middleware instead of URL params for security
    const brandId = req.brandId;
    const { brandId: urlBrandId } = req.params;
    const days = parseInt(req.query.days) || 7;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    // Security check: ensure URL brand ID matches authenticated brand ID
    if (urlBrandId !== brandId) {
      return res.status(403).json({ error: 'Access denied to this brand data' });
    }

    const brandObjectId = new mongoose.Types.ObjectId(brandId);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get daily stats
    let dailyStats = [];
    try {
      dailyStats = await Stat.aggregate([
        {
          $lookup: {
            from: "campaigns",
            localField: "campaignId",
            foreignField: "_id",
            as: "campaign"
          }
        },
        {
          $unwind: "$campaign"
        },
        {
          $match: {
            "campaign.brandId": brandObjectId,
            timestamp: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              event: "$event"
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: "$_id.date",
            events: {
              $push: { event: "$_id.event", count: "$count" }
            }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
    } catch (err) {
      console.error('Daily stats error:', err);
      dailyStats = [];
    }

    // Get total stats for the period
    let totalStatsForPeriod = [];
    try {
      totalStatsForPeriod = await Stat.aggregate([
        {
          $lookup: {
            from: "campaigns",
            localField: "campaignId",
            foreignField: "_id",
            as: "campaign"
          }
        },
        {
          $unwind: "$campaign"
        },
        {
          $match: {
            "campaign.brandId": brandObjectId,
            timestamp: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: "$event",
            count: { $sum: 1 }
          }
        }
      ]);
    } catch (err) {
      console.error('Total stats error:', err);
      totalStatsForPeriod = [];
    }

    // Get all-time stats if no data in period
    let allTimeStats = [];
    if (totalStatsForPeriod.length === 0) {
      try {
        allTimeStats = await Stat.aggregate([
          {
            $lookup: {
              from: "campaigns",
              localField: "campaignId",
              foreignField: "_id",
              as: "campaign"
            }
          },
          {
            $unwind: "$campaign"
          },
          {
            $match: {
              "campaign.brandId": brandObjectId
            }
          },
          {
            $group: {
              _id: "$event",
              count: { $sum: 1 }
            }
          }
        ]);
      } catch (err) {
        console.error('All-time stats error:', err);
        allTimeStats = [];
      }
    }

    const finalStats = totalStatsForPeriod.length > 0 ? totalStatsForPeriod : allTimeStats;
    const hasAllTimeData = totalStatsForPeriod.length === 0 && allTimeStats.length > 0;

    const totalImpressions = finalStats.find(s => s._id === 'impression')?.count || 0;
    const totalClicks = finalStats.find(s => s._id === 'click')?.count || 0;
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

    // Generate labels for the chart
    const labels = [];
    const impressionsData = [];
    const clicksData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      labels.push(date.toLocaleDateString('ru-RU'));

      const dayStats = dailyStats.find(d => d._id === dateStr);
      if (dayStats) {
        const dayImpressions = dayStats.events.find(e => e.event === 'impression')?.count || 0;
        const dayClicks = dayStats.events.find(e => e.event === 'click')?.count || 0;
        impressionsData.push(dayImpressions);
        clicksData.push(dayClicks);
      } else {
        impressionsData.push(0);
        clicksData.push(0);
      }
    }

    // Get top screens and campaigns
    const topScreens = await Stat.aggregate([
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign"
        }
      },
      {
        $unwind: "$campaign"
      },
      {
        $match: {
          "campaign.brandId": brandObjectId
        }
      },
      {
        $group: {
          _id: { screenId: "$screenId", event: "$event" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.screenId",
          events: {
            $push: { event: "$_id.event", count: "$count" }
          }
        }
      },
      {
        $project: {
          _id: 0,
          screenId: "$_id",
          impressions: {
            $sum: {
              $map: {
                input: "$events",
                as: "e",
                in: {
                  $cond: [ { $eq: ["$$e.event", "impression"] }, "$$e.count", 0 ]
                }
              }
            }
          },
          clicks: {
            $sum: {
              $map: {
                input: "$events",
                as: "e",
                in: {
                  $cond: [ { $eq: ["$$e.event", "click"] }, "$$e.count", 0 ]
                }
              }
            }
          }
        }
      },
      {
        $sort: { impressions: -1 }
      },
      {
        $limit: 5
      }
    ]);

    const topCampaigns = await Stat.aggregate([
      {
        $lookup: {
          from: "campaigns",
          localField: "campaignId",
          foreignField: "_id",
          as: "campaign"
        }
      },
      {
        $unwind: "$campaign"
      },
      {
        $match: {
          "campaign.brandId": brandObjectId
        }
      },
      {
        $group: {
          _id: { campaignId: "$campaignId", event: "$event" },
          count: { $sum: 1 },
          campaignName: { $first: "$campaign.name" }
        }
      },
      {
        $group: {
          _id: "$_id.campaignId",
          name: { $first: "$campaignName" },
          events: {
            $push: { event: "$_id.event", count: "$count" }
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$name",
          impressions: {
            $sum: {
              $map: {
                input: "$events",
                as: "e",
                in: {
                  $cond: [ { $eq: ["$$e.event", "impression"] }, "$$e.count", 0 ]
                }
              }
            }
          },
          clicks: {
            $sum: {
              $map: {
                input: "$events",
                as: "e",
                in: {
                  $cond: [ { $eq: ["$$e.event", "click"] }, "$$e.count", 0 ]
                }
              }
            }
          }
        }
      },
      {
        $sort: { impressions: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({
      labels,
      impressions: impressionsData,
      clicks: clicksData,
      totalImpressions,
      totalClicks,
      ctr,
      hasAllTimeData,
      topScreens,
      topCampaigns
    });
  } catch (error) {
    console.error('Error fetching brand chart data:', error);
    res.status(500).json({ error: 'Failed to load brand chart data' });
  }
});

module.exports = router;