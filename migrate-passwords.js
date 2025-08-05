const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

// Import the Brand model
const Brand = require('./models/Brand');

async function migratePasswords() {
  try {
    console.log('🔐 Starting password migration...');
    
    // Find all brands with plain text passwords
    const brands = await Brand.find({});
    console.log(`📊 Found ${brands.length} brands to migrate`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const brand of brands) {
      // Check if password is already hashed (bcrypt hashes start with $2b$)
      if (brand.password && !brand.password.startsWith('$2b$')) {
        console.log(`🔄 Migrating password for brand: ${brand.name} (${brand.email})`);
        
        // Hash the plain text password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(brand.password, saltRounds);
        
        // Update the brand with the hashed password
        await Brand.findByIdAndUpdate(brand._id, { password: hashedPassword });
        
        migratedCount++;
        console.log(`✅ Successfully migrated password for: ${brand.name}`);
      } else {
        console.log(`⏭️  Skipping already hashed password for: ${brand.name}`);
        skippedCount++;
      }
    }
    
    console.log('\n🎉 Password migration completed!');
    console.log(`✅ Migrated: ${migratedCount} passwords`);
    console.log(`⏭️  Skipped: ${skippedCount} already hashed passwords`);
    console.log(`📊 Total processed: ${brands.length} brands`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the migration
migratePasswords(); 