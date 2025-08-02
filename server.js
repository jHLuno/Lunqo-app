// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config({ silent: true, debug: false });

const app = express();

// CORS configuration - more permissive for development
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'http://localhost:4000', 
      'http://localhost:3000',
      'http://127.0.0.1:4000',
      'http://127.0.0.1:3000',
      'https://lunqo.app'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log the blocked origin for debugging (remove in production)
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Static files with cache control for HTML files
app.use(express.static('public', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Handle client-side routing for React app
app.get(['/en', '/ru', '/en/*', '/ru/*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Import models for public endpoints
const Stat = require('./models/Stat');
const Campaign = require('./models/Campaign');

// Import routes
const screenRoutes = require('./routes/screens');
const statRoutes = require('./routes/stats');
const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brand');
const adminRoutes = require('./routes/admin');

// Import middleware
const { authBrand, authAdmin } = require('./middleware/authMiddleware');

// Route registration
app.use('/api/screens', screenRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/brand', authBrand, brandRoutes);
app.use('/api/admin', authAdmin, adminRoutes);

// Public tracking endpoint (no authentication required)
app.post('/api/tracking/click', async (req, res) => {
  try {
    const { screenId, brandId, campaignId, trackingId } = req.body;
    
    // Input validation
    if (!screenId || !brandId || !campaignId || !trackingId) {
      return res.status(400).json({ 
        error: 'Missing required fields: screenId, brandId, campaignId, trackingId' 
      });
    }

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(brandId) || !mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ error: 'Invalid brandId or campaignId format' });
    }

    // Save click event to statistics
    await Stat.create({
      screenId,
      brandId,
      campaignId,
      event: 'click',
      timestamp: new Date(),
      trackingId
    });

    // Get campaign information for redirect
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Create URL with UTM parameters
    const utmUrl = new URL(campaign.promoUrl || 'https://example.com');
    utmUrl.searchParams.set('utm_source', 'taxi_ads');
    utmUrl.searchParams.set('utm_medium', 'qr_code');
    utmUrl.searchParams.set('utm_campaign', campaign.name);
    utmUrl.searchParams.set('utm_content', screenId);
    utmUrl.searchParams.set('tracking_id', trackingId);

    res.json({ 
      redirectUrl: utmUrl.toString(),
      message: 'Click tracked successfully'
    });

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal server error during tracking' });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Start server and connect to MongoDB
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is required');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});


