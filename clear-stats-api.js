const axios = require('axios');

const BASE_URL = 'http://localhost:4000/api'; 
let adminToken = '';

// Test configuration
const adminCredentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};

async function clearAllStats() {
  try {
    console.log('🔗 Connecting to server...');
    
    // First, authenticate as admin
    console.log('🔐 Authenticating as admin...');
    const authResponse = await axios.post(`${BASE_URL}/auth/admin`, adminCredentials);
    adminToken = authResponse.data.token;
    console.log('✅ Admin authentication successful');
    
    // Get current stats to see what we're clearing
    console.log('📊 Getting current statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/admin/stats/summary`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    console.log('Current statistics:', JSON.stringify(statsResponse.data, null, 2));
    
    // Clear all statistics by deleting all Stat documents
    console.log('🗑️  Clearing all statistics...');
    
    // Since there's no direct delete endpoint, we'll need to clear them through the database
    // But first, let's check if we can access the stats endpoint to see the current count
    
    const totalImpressions = statsResponse.data.total?.impressions || 0;
    const totalClicks = statsResponse.data.total?.clicks || 0;
    
    console.log(`📈 Found ${totalImpressions} impressions and ${totalClicks} clicks`);
    
    if (totalImpressions === 0 && totalClicks === 0) {
      console.log('🎉 Statistics are already empty!');
      return;
    }
    
    // Clear all statistics using the new API endpoint
    console.log('🗑️  Clearing all statistics via API...');
    const deleteResponse = await axios.delete(`${BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    console.log('✅ Statistics cleared successfully!');
    console.log('Response:', deleteResponse.data);
    
    // Verify the statistics are cleared
    console.log('🔍 Verifying statistics are cleared...');
    const verifyResponse = await axios.get(`${BASE_URL}/admin/stats/summary`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    const newTotalImpressions = verifyResponse.data.total?.impressions || 0;
    const newTotalClicks = verifyResponse.data.total?.clicks || 0;
    
    console.log(`📊 New totals: ${newTotalImpressions} impressions, ${newTotalClicks} clicks`);
    
    if (newTotalImpressions === 0 && newTotalClicks === 0) {
      console.log('🎉 All statistics cleared successfully!');
    } else {
      console.log('⚠️  Some statistics may still remain');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Run the cleanup
clearAllStats(); 