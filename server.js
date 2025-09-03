const app = require('./app');
const mongoose = require('mongoose');

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
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      }
    });
  }
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
