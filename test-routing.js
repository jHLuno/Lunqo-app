// Simple test script to verify routing and language detection
const http = require('http');

const testUrls = [
  'http://localhost:4000/',
  'http://localhost:4000/en',
  'http://localhost:4000/ru',
  'http://localhost:4000/en/test',
  'http://localhost:4000/ru/test'
];

async function testUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          hasReactApp: data.includes('react') || data.includes('React'),
          hasLunqo: data.includes('Lunqo')
        });
      });
    }).on('error', (err) => {
      reject({ url, error: err.message });
    });
  });
}

async function runTests() {
  console.log('🧪 Testing Lunqo App Routing...\n');
  
  for (const url of testUrls) {
    try {
      const result = await testUrl(url);
      console.log(`✅ ${url}`);
      console.log(`   Status: ${result.statusCode}`);
      console.log(`   Content-Type: ${result.contentType}`);
      console.log(`   Has React App: ${result.hasReactApp}`);
      console.log(`   Has Lunqo Content: ${result.hasLunqo}\n`);
    } catch (error) {
      console.log(`❌ ${url}`);
      console.log(`   Error: ${error.error}\n`);
    }
  }
  
  console.log('🎉 Routing test completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testUrl, runTests }; 