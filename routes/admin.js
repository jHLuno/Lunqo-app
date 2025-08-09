// routes/admin.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Brand = require('../models/Brand');
const Campaign = require('../models/Campaign');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const { authAdmin } = require('../middleware/authMiddleware');  // авторизация
const Stat = require('../models/Stat');   // статистика

// DELETE /api/admin/stats — удалить всю статистику
router.delete('/stats', authAdmin, async (req, res) => {
  try {
    const result = await Stat.deleteMany({});
    res.json({ 
      message: `Successfully deleted ${result.deletedCount} statistics records`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing stats:', error);
    res.status(500).json({ error: 'Failed to clear statistics' });
  }
});

// DELETE /api/admin/stats/brand/:brandId — удалить статистику бренда
router.delete('/stats/brand/:brandId', authAdmin, async (req, res) => {
  try {
    const { brandId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }

    // Find all campaigns for this brand
    const campaigns = await Campaign.find({ brandId });
    const campaignIds = campaigns.map(c => c._id);

    // Delete all stats for campaigns of this brand
    const result = await Stat.deleteMany({ campaignId: { $in: campaignIds } });
    
    res.json({ 
      message: `Successfully deleted ${result.deletedCount} statistics records for brand`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing brand stats:', error);
    res.status(500).json({ error: 'Failed to clear brand statistics' });
  }
});

// DELETE /api/admin/stats/campaign/:campaignId — удалить статистику кампании
router.delete('/stats/campaign/:campaignId', authAdmin, async (req, res) => {
  try {
    const { campaignId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ error: 'Invalid campaign ID format' });
    }

    // Delete all stats for this campaign
    const result = await Stat.deleteMany({ campaignId });
    
    res.json({ 
      message: `Successfully deleted ${result.deletedCount} statistics records for campaign`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing campaign stats:', error);
    res.status(500).json({ error: 'Failed to clear campaign statistics' });
  }
});

router.get('/stats/summary', authAdmin, async (req, res) => {
  try {
    const totalStats = await Stat.aggregate([
      {
        $group: {
          _id: "$event",
          count: { $sum: 1 }
        }
      }
    ]);

    const byBrand = await Stat.aggregate([
      // Filter out stats with missing or invalid campaignId
      { $match: { campaignId: { $ne: null } } },
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
        $group: {
          _id: { brandId: "$campaign.brandId", event: "$event" }, // Use campaign's brandId
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.brandId",
          events: {
            $push: { event: "$_id.event", count: "$count" }
          }
        }
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "_id",
          as: "brand"
        }
      },
      {
        $unwind: "$brand"
      },
      {
        $project: {
          _id: 0,
          brandId: "$brand._id",
          name: "$brand.name",
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

    // Get detailed stats by brand with screen and campaign info
    const detailedByBrand = await Stat.aggregate([
      // Filter out stats with missing or invalid campaignId
      { $match: { campaignId: { $ne: null } } },
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
        $lookup: {
          from: "brands",
          localField: "campaign.brandId", // Use campaign's brandId instead of stat's brandId
          foreignField: "_id",
          as: "brand"
        }
      },
      {
        $unwind: "$brand"
      },
      {
        $group: {
          _id: {
            brandId: "$campaign.brandId", // Group by campaign's brandId
            brandName: "$brand.name",
            screenId: "$screenId",
            campaignId: "$campaignId",
            campaignName: "$campaign.name"
          },
          events: {
            $push: { event: "$event", timestamp: "$timestamp" }
          }
        }
      },
      {
        $group: {
          _id: {
            brandId: "$_id.brandId",
            brandName: "$_id.brandName"
          },
          screens: {
            $push: {
              screenId: "$_id.screenId",
              campaignId: "$_id.campaignId",
              campaignName: "$_id.campaignName",
              events: "$events"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          brandId: "$_id.brandId",
          name: "$_id.brandName",
          screens: {
            $map: {
              input: "$screens",
              as: "screen",
              in: {
                screenId: "$$screen.screenId",
                campaignId: "$$screen.campaignId",
                campaignName: "$$screen.campaignName",
                impressions: {
                  $size: {
                    $filter: {
                      input: "$$screen.events",
                      as: "event",
                      cond: { $eq: ["$$event.event", "impression"] }
                    }
                  }
                },
                clicks: {
                  $size: {
                    $filter: {
                      input: "$$screen.events",
                      as: "event",
                      cond: { $eq: ["$$event.event", "click"] }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]);

    const response = {
      total: {
        impressions: totalStats.find(e => e._id === 'impression')?.count || 0,
        clicks: totalStats.find(e => e._id === 'click')?.count || 0,
      },
      byBrand,
      detailedByBrand
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка статистики' });
  }
});



// ✅ POST /api/admin/tracking/click — отслеживание кликов по QR коду (требует авторизации)
router.post('/tracking/click', authAdmin, async (req, res) => {
  try {
    const { screenId, brandId, campaignId, trackingId } = req.body;
    
    if (!screenId || !brandId || !campaignId || !trackingId) {
      return res.status(400).json({ error: 'Не хватает данных для отслеживания' });
    }

    // Сохраняем клик в статистику
    await Stat.create({
      screenId,
      brandId,
      campaignId,
      event: 'click',
      timestamp: new Date(),
      trackingId // уникальный ID для отслеживания
    });

    // Получаем информацию о кампании для редиректа
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Кампания не найдена' });
    }

    // Создаем URL с UTM параметрами
    const utmUrl = new URL(campaign.promoUrl || 'https://example.com');
    utmUrl.searchParams.set('utm_source', 'taxi_ads');
    utmUrl.searchParams.set('utm_medium', 'qr_code');
    utmUrl.searchParams.set('utm_campaign', campaign.name);
    utmUrl.searchParams.set('utm_content', screenId);
    utmUrl.searchParams.set('tracking_id', trackingId);

    res.json({ 
      redirectUrl: utmUrl.toString(),
      message: 'Клик зафиксирован'
    });

  } catch (err) {
    console.error('Tracking error:', err);
    res.status(500).json({ error: 'Ошибка отслеживания' });
  }
});

// ✅ GET /api/admin/tracking/qr/:campaignId — генерация QR кода
router.get('/tracking/qr/:campaignId', authAdmin, async (req, res) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('QR generation request for campaign:', req.params.campaignId);
      console.log('Query parameters:', req.query);
    }
    
    const { campaignId } = req.params;
    const { screenId } = req.query; // Получаем screenId из query параметров
    const campaign = await Campaign.findById(campaignId);
    
          if (process.env.NODE_ENV !== 'production') {
        console.log('Campaign found:', campaign ? 'yes' : 'no');
        console.log('Screen ID from query:', screenId);
      }
    
    if (!campaign) {
              if (process.env.NODE_ENV !== 'production') {
          console.log('Campaign not found for ID:', campaignId);
        }
      return res.status(404).json({ error: 'Кампания не найдена' });
    }

    // Создаем уникальный tracking ID
    const trackingId = `qr_${campaignId}_${Date.now()}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log('Generated tracking ID:', trackingId);
    }
    
    // Создаем короткий URL для QR кода
    const qrUrl = `${req.protocol}://${req.get('host')}/tracking.html`;
    if (process.env.NODE_ENV !== 'production') {
      console.log('QR URL:', qrUrl);
    }
    
    // Данные для QR кода (параметры для tracking.html)
    const qrData = {
      url: qrUrl,
      params: {
        s: screenId || 'qr_scan', // screenId (сокращено)
        b: campaign.brandId, // brandId (сокращено)
        c: campaign._id, // campaignId (сокращено)
        t: trackingId, // trackingId (сокращено)
        p: campaign.promoUrl || 'https://example.com' // promoUrl (сокращено)
      }
    };

    if (process.env.NODE_ENV !== 'production') {
      console.log('QR data prepared:', qrData);
    }

    res.json({
      qrData,
      trackingId,
      message: 'QR код готов для генерации'
    });

  } catch (err) {
    console.error('QR generation error:', err);
    res.status(500).json({ error: 'Ошибка генерации QR кода: ' + err.message });
  }
});

// ✅ GET /api/admin/stats/brand/:brandId — детальная статистика по бренду
router.get('/stats/brand/:brandId', authAdmin, async (req, res) => {
  try {
    const { brandId } = req.params;
    const days = parseInt(req.query.days) || 7;
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Received request for brandId:', brandId, 'days:', days);
    }
    
    // Convert brandId to ObjectId
    const mongoose = require('mongoose');
    let brandObjectId;
    try {
      brandObjectId = new mongoose.Types.ObjectId(brandId);
      if (process.env.NODE_ENV !== 'production') {
        console.log('Converted to ObjectId:', brandObjectId);
      }
    } catch (err) {
      console.error('Invalid ObjectId:', brandId);
      return res.status(400).json({ error: 'Неверный ID бренда' });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Start date:', startDate);
    }
    
    // Get daily stats
    let dailyStats = [];
    try {
      dailyStats = await Stat.aggregate([
        {
          $match: {
            brandId: brandObjectId,
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
      if (process.env.NODE_ENV !== 'production') {
        console.log('Daily stats (direct) success:', dailyStats.length);
      }
    } catch (err) {
      console.error('Daily stats (direct) error:', err);
      dailyStats = [];
    }
    
    // Also try with lookup approach like the main endpoint
    let dailyStatsWithLookup = [];
    try {
      dailyStatsWithLookup = await Stat.aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand"
          }
        },
        {
          $match: {
            "brand._id": brandObjectId,
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
      if (process.env.NODE_ENV !== 'production') {
        console.log('Daily stats (lookup) success:', dailyStatsWithLookup.length);
      }
    } catch (err) {
      console.error('Daily stats (lookup) error:', err);
      dailyStatsWithLookup = [];
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Daily stats (direct):', dailyStats.length);
      console.log('Daily stats (lookup):', dailyStatsWithLookup.length);
    }
    
    // Use the lookup version if it has more data
    const finalDailyStats = dailyStatsWithLookup.length > dailyStats.length ? dailyStatsWithLookup : dailyStats;
    
    // Get top screens
    const topScreens = await Stat.aggregate([
      {
        $match: {
          brandId: brandObjectId,
          timestamp: { $gte: startDate }
        }
      },
      {
        $lookup: {
          from: "screens",
          localField: "screenId",
          foreignField: "screenId",
          as: "screen"
        }
      },
      {
        $group: {
          _id: "$screenId",
          screenInfo: { $first: "$screen" },
          impressions: {
            $sum: { $cond: [{ $eq: ["$event", "impression"] }, 1, 0] }
          },
          clicks: {
            $sum: { $cond: [{ $eq: ["$event", "click"] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 1,
          screenId: "$_id",
          screenName: { $arrayElemAt: ["$screenInfo.screenId", 0] },
          impressions: 1,
          clicks: 1
        }
      },
      {
        $sort: { impressions: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    // Get top campaigns
    const topCampaigns = await Stat.aggregate([
      {
        $match: {
          brandId: brandObjectId,
          timestamp: { $gte: startDate }
        }
      },
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
        $group: {
          _id: "$campaignId",
          name: { $first: "$campaign.name" },
          impressions: {
            $sum: { $cond: [{ $eq: ["$event", "impression"] }, 1, 0] }
          },
          clicks: {
            $sum: { $cond: [{ $eq: ["$event", "click"] }, 1, 0] }
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
    
    // Use the same approach as the main stats endpoint - with lookup
    let totalStatsWithLookup = [];
    try {
      totalStatsWithLookup = await Stat.aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand"
          }
        },
        {
          $match: {
            "brand._id": brandObjectId,
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
      if (process.env.NODE_ENV !== 'production') {
        console.log('Total stats with lookup success:', totalStatsWithLookup);
      }
    } catch (err) {
      console.error('Total stats with lookup error:', err);
      totalStatsWithLookup = [];
    }
    
    // Also get all-time stats with lookup
    let allTimeStatsWithLookup = [];
    try {
      allTimeStatsWithLookup = await Stat.aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "brand"
          }
        },
        {
          $match: {
            "brand._id": brandObjectId
          }
        },
        {
          $group: {
            _id: "$event",
            count: { $sum: 1 }
          }
        }
      ]);
      if (process.env.NODE_ENV !== 'production') {
        console.log('All-time stats with lookup success:', allTimeStatsWithLookup);
      }
    } catch (err) {
      console.error('All-time stats with lookup error:', err);
      allTimeStatsWithLookup = [];
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Period stats with lookup:', totalStatsWithLookup);
      console.log('All-time stats with lookup:', allTimeStatsWithLookup);
    }
    
    const totalImpressions = totalStatsWithLookup.find(s => s._id === 'impression')?.count || 0;
    const totalClicks = totalStatsWithLookup.find(s => s._id === 'click')?.count || 0;
    
    // If no data in selected period, use all-time stats
    let finalImpressions = totalImpressions;
    let finalClicks = totalClicks;
    let hasAllTimeData = false;
    
    if (totalImpressions === 0 && totalClicks === 0) {
      finalImpressions = allTimeStatsWithLookup.find(s => s._id === 'impression')?.count || 0;
      finalClicks = allTimeStatsWithLookup.find(s => s._id === 'click')?.count || 0;
      hasAllTimeData = true;
    }
    
    const ctr = finalImpressions > 0 ? ((finalClicks / finalImpressions) * 100).toFixed(2) : '0.00';
    
    // Prepare chart data
    const labels = [];
    const impressions = [];
    const clicks = [];
    
    // Fill in missing dates with zeros
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      labels.push(dateStr);
      
      const dayStats = finalDailyStats.find(d => d._id === dateStr);
      if (dayStats) {
        const dayImpressions = dayStats.events.find(e => e.event === 'impression')?.count || 0;
        const dayClicks = dayStats.events.find(e => e.event === 'click')?.count || 0;
        impressions.push(dayImpressions);
        clicks.push(dayClicks);
      } else {
        impressions.push(0);
        clicks.push(0);
      }
    }
    
    res.json({
      labels,
      impressions,
      clicks,
      totalImpressions: finalImpressions,
      totalClicks: finalClicks,
      ctr,
      dailyStats: finalDailyStats,
      topScreens,
      topCampaigns,
      hasAllTimeData: hasAllTimeData
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка загрузки статистики бренда' });
  }
});

// ✅ POST /api/admin/brands — создать бренд
router.post('/brands', authAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    const existing = await Brand.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Бренд с таким email уже существует' });
    }

    const brand = new Brand({ name, email, password });
    await brand.save();
    res.status(201).json(brand);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании бренда' });
  }
});

// ✅ PATCH /api/admin/brands/:id — обновить бренд
router.patch('/brands/:id', authAdmin, async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Бренд обновлён', brand });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка обновления бренда' });
  }
});


// ✅ GET /api/admin/brands — получить список брендов
router.get('/brands', authAdmin, async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении брендов' });
  }
});

// ✅ GET /api/admin/brands/:id — получить один бренд
router.get('/brands/:id', authAdmin, async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid brand ID format' });
    }
    
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: 'Бренд не найден' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Ошибка при получении бренда' });
  }
});

// DELETE /api/admin/brands/:id - удалить бренд
router.delete('/brands/:id', authAdmin, async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: 'Бренд удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления бренда' });
  }
});


// ✅ POST /api/admin/campaigns — создать кампанию
router.post('/campaigns', authAdmin, async (req, res) => {
  try {
    const { name, brandId, startDate, endDate, videos, promoUrl } = req.body;

    // Если brandId не указан, используем первый доступный бренд
    let finalBrandId = brandId;
    if (!finalBrandId) {
      const Brand = require('../models/Brand');
      const firstBrand = await Brand.findOne();
      if (!firstBrand) {
        return res.status(400).json({ error: 'Сначала создайте бренд' });
      }
      finalBrandId = firstBrand._id;
    }

    const newCampaign = new Campaign({
      name,
      brandId: finalBrandId,
      startDate,
      endDate,
      videos,
      promoUrl
    });

    await newCampaign.save();

    res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании кампании' });
  }
});

// DELETE /api/admin/campaigns/:id - удалить кампанию
router.delete('/campaigns/:id', authAdmin, async (req, res) => {
  try {
    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: 'Кампания удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления кампании' });
  }
});



// ✅ GET /api/admin/campaigns — получить все кампании
router.get('/campaigns', authAdmin, async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('brandId', 'name');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении кампаний' });
  }
});

// PATCH /api/admin/campaigns/:id
router.patch('/campaigns/:id', authAdmin, async (req, res) => { 
  const allowed = ['name', 'startDate', 'endDate', 'videos', 'promoUrl'];
  const update = {};
  allowed.forEach(key => {
    if (req.body[key] !== undefined) update[key] = req.body[key];
  });

  try {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(500).json({ error: 'Ошибка при обновлении кампании' });
  }
});

// GET /api/admin/campaigns/:id — получить одну кампанию
router.get('/campaigns/:id', authAdmin, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Кампания не найдена' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении кампании' });
  }
});

const Screen = require('../models/Screen');

// ✅ POST /api/admin/screens — создать экран
router.post('/screens', authAdmin, async (req, res) => {
  try {
    const { screenId, brandId } = req.body;

    if (!screenId || !brandId) {
      return res.status(400).json({ error: 'ID экрана и ID бренда обязательны' });
    }

    const existing = await Screen.findOne({ screenId });
    if (existing) {
      return res.status(409).json({ error: 'Экран с таким ID уже существует' });
    }

    const screen = new Screen({ screenId, brandId });
    await screen.save();
    res.status(201).json(screen);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании экрана' });
  }
});

// DELETE /api/admin/screens/:id - удалить экран
router.delete('/screens/:id', authAdmin, async (req, res) => {
  try {
    await Screen.findByIdAndDelete(req.params.id);
    res.json({ message: 'Экран удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка удаления экрана' });
  }
});

// ✅ GET /api/admin/screens - получить все экраны
router.get('/screens', authAdmin, async (req, res) => {
  try {
    const screens = await Screen.find();
    res.json(screens);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении экранов' });
  }
});

// GET /api/admin/screens/:id — получить один экран
router.get('/screens/:id', authAdmin, async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.id);
    if (!screen) {
      return res.status(404).json({ error: 'Экран не найден' });
    }
    res.json(screen);
  } catch (error) {
    console.error('Error fetching screen:', error);
    res.status(500).json({ error: 'Ошибка при получении экрана' });
  }
});

// PATCH /api/admin/screens/:id
router.patch('/screens/:id', authAdmin, async (req, res) => {  
  const update = {};
  if (req.body.screenId !== undefined) update.screenId = req.body.screenId;
  if (req.body.brandId !== undefined) update.brandId = req.body.brandId;
  if (req.body.currentCampaignId !== undefined) update.currentCampaignId = req.body.currentCampaignId;
  if (req.body.isOnline !== undefined) update.isOnline = req.body.isOnline;

  try {
    const updated = await Screen.findByIdAndUpdate(req.params.id, update, { new: true });
    
    // Broadcast status change if isOnline was updated
    if (req.body.isOnline !== undefined && global.broadcastScreenStatus) {
      global.broadcastScreenStatus(updated.screenId, updated.isOnline);
    }
    
    res.json(updated);
  } catch (err) {
    console.error('Error updating screen:', err);
    res.status(500).json({ error: 'Ошибка при обновлении экрана' });
  }
});

// PATCH /api/admin/screens/:id/toggle-online - Toggle screen online status
router.patch('/screens/:id/toggle-online', authAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid screen ID format' });
    }

    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ error: 'Экран не найден' });
    }

    // Toggle the online status
    screen.isOnline = !screen.isOnline;
    await screen.save();

    // Broadcast status change to connected screens
    if (global.broadcastScreenStatus) {
      global.broadcastScreenStatus(screen.screenId, screen.isOnline);
    }

    res.json({ 
      message: `Экран ${screen.isOnline ? 'включен' : 'выключен'}`,
      screen: {
        _id: screen._id,
        screenId: screen.screenId,
        isOnline: screen.isOnline,
        brandId: screen.brandId,
        currentCampaignId: screen.currentCampaignId
      }
    });
  } catch (err) {
    console.error('Error toggling screen online status:', err);
    res.status(500).json({ error: 'Ошибка при изменении статуса экрана' });
  }
});

// PATCH /api/admin/screens/bulk-toggle - Toggle multiple screens online status
router.patch('/screens/bulk-toggle', authAdmin, async (req, res) => {
  try {
    const { screenIds, isOnline } = req.body;
    
    if (!Array.isArray(screenIds) || screenIds.length === 0) {
      return res.status(400).json({ error: 'Screen IDs array is required' });
    }

    if (typeof isOnline !== 'boolean') {
      return res.status(400).json({ error: 'isOnline must be a boolean value' });
    }

    // Validate all screen IDs are valid ObjectIds
    const invalidIds = screenIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({ error: `Invalid screen ID format: ${invalidIds.join(', ')}` });
    }

    // Get screens before update to broadcast changes
    const screensToUpdate = await Screen.find({ _id: { $in: screenIds } });

    const result = await Screen.updateMany(
      { _id: { $in: screenIds } },
      { $set: { isOnline: isOnline } }
    );

    // Broadcast status changes for all affected screens
    if (global.broadcastScreenStatus) {
      screensToUpdate.forEach(screen => {
        global.broadcastScreenStatus(screen.screenId, isOnline);
      });
    }

    res.json({ 
      message: `${result.modifiedCount} экранов ${isOnline ? 'включено' : 'выключено'}`,
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    console.error('Error bulk toggling screen status:', err);
    res.status(500).json({ error: 'Ошибка при массовом изменении статуса экранов' });
  }
});







module.exports = router;
