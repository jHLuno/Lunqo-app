// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config({ silent: true, debug: false });

const app = express();

// Trust proxy headers - essential for Railway and other cloud providers
// This allows express-rate-limit to correctly identify client IPs
app.set('trust proxy', true);

// Import security middleware
const { 
  authLimiter, 
  apiLimiter, 
  trackingLimiter, 
  securityHeaders, 
  sanitizeInput 
} = require('./middleware/securityMiddleware');

// Apply security headers globally
app.use(securityHeaders);

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
      if (process.env.NODE_ENV === 'development') {
        if (process.env.NODE_ENV !== 'production') {
      console.log('CORS blocked origin:', origin);
    }
      }
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 hours
}));

// Middleware
app.use(express.json());
app.use(sanitizeInput);

// Import models for public endpoints
const Stat = require('./models/Stat');
const Campaign = require('./models/Campaign');
const Screen = require('./models/Screen');

// Import routes
const screenRoutes = require('./routes/screens');
const statRoutes = require('./routes/stats');
const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brand');
const adminRoutes = require('./routes/admin');

// Import middleware
const { authBrand, authAdmin } = require('./middleware/authMiddleware');

// Apply rate limiting to routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/screens', apiLimiter, screenRoutes);
app.use('/api/stats', apiLimiter, statRoutes);
app.use('/api/brand', authBrand, apiLimiter, brandRoutes);
app.use('/api/admin', authAdmin, apiLimiter, adminRoutes);

// Public tracking endpoint (no authentication required) with rate limiting
app.post('/api/tracking/click', trackingLimiter, async (req, res) => {
  try {
    const { screenId, brandId, campaignId, trackingId } = req.body;
    
    // Input validation
    if (!screenId || !brandId || !campaignId || !trackingId) {
      return res.status(400).json({ 
        error: 'Missing required fields: screenId, brandId, campaignId, trackingId' 
      });
    }

    // Sanitize inputs
    const sanitizedScreenId = String(screenId).trim().replace(/[^a-zA-Z0-9_-]/g, '');
    const sanitizedTrackingId = String(trackingId).trim().replace(/[^a-zA-Z0-9_-]/g, '');

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(brandId) || !mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ error: 'Invalid brandId or campaignId format' });
    }

    // Save click event to statistics
    await Stat.create({
      screenId: sanitizedScreenId,
      brandId,
      campaignId,
      event: 'click',
      timestamp: new Date(),
      trackingId: sanitizedTrackingId
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
    utmUrl.searchParams.set('utm_content', sanitizedScreenId);
    utmUrl.searchParams.set('tracking_id', sanitizedTrackingId);

    res.json({ 
      redirectUrl: utmUrl.toString(),
      message: 'Click tracked successfully'
    });

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal server error during tracking' });
  }
});

// Store SSE connections for screen status updates
const screenStatusConnections = new Map();

// SSE endpoint for real-time screen status updates
app.get('/api/screens/:screenId/status-stream', async (req, res) => {
  const { screenId } = req.params;
  
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // Store connection
  if (!screenStatusConnections.has(screenId)) {
    screenStatusConnections.set(screenId, new Set());
  }
  screenStatusConnections.get(screenId).add(res);

  // Send initial screen status
  try {
    const screen = await Screen.findOne({ screenId });
    if (screen) {
      const data = JSON.stringify({
        screenId,
        isOnline: screen.isOnline !== false,
        timestamp: new Date().toISOString()
      });
      res.write(`data: ${data}\n\n`);
    }
  } catch (error) {
    console.error('Error sending initial screen status:', error);
  }

  // Send keepalive every 30 seconds
  const keepAlive = setInterval(() => {
    res.write(`: keepalive\n\n`);
  }, 30000);

  // Clean up on disconnect
  req.on('close', () => {
    clearInterval(keepAlive);
    if (screenStatusConnections.has(screenId)) {
      screenStatusConnections.get(screenId).delete(res);
      if (screenStatusConnections.get(screenId).size === 0) {
        screenStatusConnections.delete(screenId);
      }
    }
  });
});

// Function to broadcast screen status changes
function broadcastScreenStatus(screenId, isOnline) {
  if (screenStatusConnections.has(screenId)) {
    const data = JSON.stringify({
      screenId,
      isOnline,
      timestamp: new Date().toISOString()
    });
    
    const connections = screenStatusConnections.get(screenId);
    connections.forEach(res => {
      try {
        res.write(`data: ${data}\n\n`);
      } catch (error) {
        // Remove dead connections
        connections.delete(res);
      }
    });
  }
}

// Make broadcast function globally available
global.broadcastScreenStatus = broadcastScreenStatus;

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Serve static files with cache control for HTML files
app.use(express.static('public', {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    } else if (filePath.endsWith('.otf') || filePath.endsWith('.woff') || filePath.endsWith('.woff2') || filePath.endsWith('.ttf')) {
      // Font files - cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
      // CSS and JS files - cache for 1 month
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.gif') || filePath.endsWith('.ico')) {
      // Image files - cache for 1 month
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    }
  }
}));

// Handle client-side routing for both languages (must be after static files)
app.get(['/en', '/ru'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle nested routes for both languages
app.get(['/en/*', '/ru/*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Redirect root to English by default
app.get('/', (req, res) => {
  res.redirect('/en');
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
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Connected to MongoDB');
  }
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    }
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});


